import React, { useEffect } from "react";
import { ChatMessage } from "../../entities/ChatMessage";
import { Child } from "../../entities/Child";
import { InvokeLLM } from "../../integrations/Core";
import { differenceInMonths, differenceInDays, differenceInWeeks, format } from "date-fns";

export default function ProactiveMessaging({ children }) {
  
  useEffect(() => {
    if (children.length > 0) {
      children.forEach(child => {
        checkForProactiveMessages(child);
      });
    }
  }, [children]);

  const checkForProactiveMessages = async (child) => {
    try {
      const now = new Date();
      const birthDate = new Date(child.birthday);
      const ageInMonths = differenceInMonths(now, birthDate);
      const ageInDays = differenceInDays(now, birthDate);
      const ageInWeeks = differenceInWeeks(now, birthDate);

      // Check if we need to send milestone updates
      await checkMilestoneUpdates(child, ageInMonths, ageInDays);
      
      // Check for weekly check-ins (for children under 6 months)
      if (ageInMonths < 6) {
        await checkWeeklyUpdates(child, ageInWeeks);
      }

      // Check for celebration messages
      await checkCelebrationMessages(child, ageInDays, ageInMonths);

    } catch (error) {
      console.error('Error checking proactive messages:', error);
    }
  };

  const checkMilestoneUpdates = async (child, ageInMonths, ageInDays) => {
    const lastCheck = child.last_milestone_check ? new Date(child.last_milestone_check) : new Date(child.created_date);
    const daysSinceLastCheck = differenceInDays(new Date(), lastCheck);

    // Send milestone updates every 2 weeks for children under 12 months, monthly after
    const checkInterval = ageInMonths < 12 ? 14 : 30;
    
    if (daysSinceLastCheck >= checkInterval) {
      await sendMilestoneUpdate(child, ageInMonths, ageInDays);
    }
  };

  const checkWeeklyUpdates = async (child, ageInWeeks) => {
    // Check if we sent a weekly update this week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const weeklyMessages = await ChatMessage.filter({
      child_id: child.id,
      message_type: "weekly_check"
    });

    const hasWeeklyMessageThisWeek = weeklyMessages.some(msg => {
      const msgDate = new Date(msg.timestamp);
      return msgDate >= startOfWeek;
    });

    if (!hasWeeklyMessageThisWeek && ageInWeeks > 0) {
      await sendWeeklyUpdate(child, ageInWeeks);
    }
  };

  const checkCelebrationMessages = async (child, ageInDays, ageInMonths) => {
    // Send celebration messages on monthly birthdays
    const today = new Date();
    const birthDate = new Date(child.birthday);
    
    // Check if today is a monthly birthday
    if (today.getDate() === birthDate.getDate() && ageInMonths > 0) {
      const celebrationMessages = await ChatMessage.filter({
        child_id: child.id,
        message_type: "celebration"
      });

      const hasCelebrationThisMonth = celebrationMessages.some(msg => {
        const msgDate = new Date(msg.timestamp);
        return msgDate.getMonth() === today.getMonth() && msgDate.getFullYear() === today.getFullYear();
      });

      if (!hasCelebrationThisMonth) {
        await sendCelebrationMessage(child, ageInMonths);
      }
    }
  };

  const sendMilestoneUpdate = async (child, ageInMonths, ageInDays) => {
    const prompt = `Generate a brief, encouraging milestone update for ${child.name} who is ${ageInMonths} months (${ageInDays} days) old.

Include:
- 2-3 specific milestones they might be reaching soon
- One practical tip for parents
- Brief encouragement
- Helpful references

Keep it warm, concise (3-4 sentences), and include proper references with links at the end.

Format as:
[Brief milestone info and tip]

**References:**
• [Resource with link]
• [Another resource with link]

**Remember:** Every child develops at their own pace.`;

    try {
      const response = await InvokeLLM({ prompt });
      
      await ChatMessage.create({
        child_id: child.id,
        message: response,
        sender: "ai",
        message_type: "milestone_update",
        timestamp: new Date().toISOString()
      });

      // Update last milestone check
      await Child.update(child.id, {
        last_milestone_check: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error sending milestone update:', error);
    }
  };

  const sendWeeklyUpdate = async (child, ageInWeeks) => {
    const prompt = `Generate a brief weekly check-in for ${child.name} who is ${ageInWeeks} weeks old.

Include:
- What's happening this week developmentally
- One simple activity or tip
- Brief encouragement for parents
- Reference with link

Keep it very short (2-3 sentences) and supportive.

Format as:
[Brief weekly insight and tip]

**References:**
• [Helpful resource with link]

**Remember:** You're doing great!`;

    try {
      const response = await InvokeLLM({ prompt });
      
      await ChatMessage.create({
        child_id: child.id,
        message: response,
        sender: "ai",
        message_type: "weekly_check",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending weekly update:', error);
    }
  };

  const sendCelebrationMessage = async (child, ageInMonths) => {
    const prompt = `Generate a celebration message for ${child.name}'s ${ageInMonths}-month birthday!

Include:
- Celebration of how much they've grown
- Highlight 1-2 major milestones they've likely achieved
- Brief encouragement for parents
- Reference with link

Keep it joyful and brief (2-3 sentences).

Format as:
🎉 [Celebration message]

**References:**
• [Development resource with link]

**Remember:** Celebrate every milestone!`;

    try {
      const response = await InvokeLLM({ prompt });
      
      await ChatMessage.create({
        child_id: child.id,
        message: response,
        sender: "ai",
        message_type: "celebration",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error sending celebration message:', error);
    }
  };

  // This component doesn't render anything visible
  return null;
}
