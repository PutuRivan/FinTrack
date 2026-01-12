"use client"

import { useFormState } from "react-dom";
import { createGoal } from "@/lib/actions";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function GoalForm() {
  const [state, action] = useFormState(createGoal, {
    success: false,
    message: "",
  });
  return (
    <form action={action}>
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel>Goal Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            required
          />
        </Field>
        {/* Target Amount */}
        <Field>
          <FieldLabel>Target Amount</FieldLabel>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter Amount"
            required
          />
        </Field>
        {/* Target Date */}
        <Field>
          <FieldLabel>Target Date</FieldLabel>
          <Input
            id="targetDate"
            name="targetDate"
            type="date"
            placeholder="Enter Target Date"
            required
          />
        </Field>
        {state.success ? (
          <p className="text-green-500">{state.message}</p>
        ) : (
          <p className="text-red-500">{state.message}</p>
        )}
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  );
}
