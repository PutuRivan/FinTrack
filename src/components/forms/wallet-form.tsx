"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { createWallet, updateWallet } from "@/lib/actions";
import { walletIconMap } from "@/lib/types/map";
import type { TFormState } from "@/lib/types/schema";
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

interface WalletFormProps {
  wallet?: {
    id: string;
    name: string;
    type: string;
    icon: string;
    rek: string;
    balance: number;
  };
  onSubmit?: (state: TFormState, payload: FormData) => Promise<TFormState>;
}

export default function WalletForm({ wallet }: WalletFormProps) {
  const [selectedType, setSelectedType] = useState<string>(wallet?.type || "");
  const [selectedIcon, setSelectedIcon] = useState<string>(wallet?.icon || "");

  const initialAction = wallet ? updateWallet : createWallet;

  const [state, action] = useFormState(initialAction, {
    success: false,
    message: "",
  });

  return (
    <form action={action}>
      {wallet && <Input type="hidden" name="id" value={wallet.id} />}
      <FieldGroup>
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            defaultValue={wallet?.name}
            required
          />
        </Field>
        {/* Type */}
        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Select
            name="type"
            value={selectedType}
            required
            onValueChange={(value) => setSelectedType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(walletIconMap).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        {/* Icon */}
        <Field>
          <FieldLabel htmlFor="icon">Icon</FieldLabel>
          <Select
            name="icon"
            required
            value={selectedIcon}
            onValueChange={(value) => setSelectedIcon(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(walletIconMap).map(
                ([key, { icon: IconComponent }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </Field>
        {/* Rek */}
        <Field>
          <FieldLabel htmlFor="rek">Rek Number</FieldLabel>
          <Input
            id="rek"
            name="rek"
            type="text"
            placeholder="Enter Rek Number"
            defaultValue={wallet?.rek}
            required
          />
        </Field>
        {/* Balance */}
        <Field>
          <FieldLabel htmlFor="balance">Balance</FieldLabel>
          <Input
            id="balance"
            name="balance"
            type="number"
            placeholder="Enter Balance"
            defaultValue={wallet?.balance}
            required
          />
        </Field>
        {state.success ? (
          <p className="text-green-500">{state.message}</p>
        ) : (
          state.message && <p className="text-red-500">{state.message}</p>
        )}
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  );
}
