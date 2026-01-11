"use client";

import { useState } from "react";
import { iconMap } from "@/lib/types/map";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Icon mapping

export default function CategoryForm() {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("#3b82f6");

  return (
    <form>
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" type="text" placeholder="Enter Name" />
        </Field>
        {/* Type */}
        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        {/* Icon */}
        <Field>
          <FieldLabel htmlFor="icon">Icon</FieldLabel>
          <Select value={selectedIcon} onValueChange={setSelectedIcon}>
            <SelectTrigger>
              <SelectValue placeholder="Select an icon">
                {selectedIcon && iconMap[selectedIcon] && (
                  <div className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = iconMap[selectedIcon].icon;
                      return (
                        <IconComponent
                          className="h-4 w-4"
                          style={{ color: selectedColor }}
                        />
                      );
                    })()}
                    <span>{iconMap[selectedIcon].label}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(iconMap).map(
                ([key, { icon: IconComponent, label }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </Field>
        {/* Color */}
        <Field>
          <FieldLabel htmlFor="color">Color</FieldLabel>
          <div className="flex items-center gap-3">
            <Input
              id="color"
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </Field>
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  );
}
