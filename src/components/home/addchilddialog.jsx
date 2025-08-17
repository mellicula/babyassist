import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/datepicker";
import { Baby } from "lucide-react";

export default function AddChildDialog({ open, onOpenChange, onAddChild }) {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    photo_url: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!formData.name || !formData.birthday) {
      console.log('Missing required fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onAddChild(formData);
      setFormData({ name: "", birthday: "", photo_url: "" });
    } catch (error) {
      console.error('Error adding child:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto glass-effect border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center shadow-lg">
            <Baby className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Add Your Child
          </DialogTitle>
          <p className="text-gray-600 text-sm">
            Let's get to know your little one
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your child's name"
              className="rounded-full border-2 border-gray-200 focus:border-indigo-400 px-4 py-3"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday" className="text-sm font-medium text-gray-700">
              Birthday *
            </Label>
            <DatePicker
              value={formData.birthday}
              onChange={(value) => handleInputChange('birthday', value)}
              placeholder="Select your child's birthday"
              max={new Date().toISOString().split('T')[0]}
              min="2020-01-01"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Click to open calendar picker
            </p>
          </div>



          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-full border-2 border-gray-200 py-3 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.name || !formData.birthday || isSubmitting}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full py-3 font-medium"
            >
              {isSubmitting ? 'Adding...' : 'Add Child'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
