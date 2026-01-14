import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useCategories } from "@/hooks/use-category";
import { useWallets } from "@/hooks/use-wallet";
import { createTransaction } from "@/lib/actions";
import { iconMap, walletIconMap } from "@/lib/types/map";
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

export default function TransactionsForm() {
  const { data: categories } = useCategories();
  const { data: wallets } = useWallets();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [state, action] = useFormState(createTransaction, {
    success: false,
    message: "",
  });

  return (
    <form action={action}>
      <FieldGroup>
        {/* Type */}
        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <input type="hidden" name="type" value={selectedType} />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        {/* Amount */}
        <Field>
          <FieldLabel htmlFor="amount">Amount</FieldLabel>
          <Input id="amount" type="number" name="amount" placeholder="Enter Amount" />
        </Field>
        {/* Category */}
        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <input type="hidden" name="category" value={selectedCategory} />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => {
                const IconComponent =
                  category.icon && iconMap[category.icon]
                    ? iconMap[category.icon].icon
                    : null;
                return (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    onSelect={() => setSelectedCategory(category.id)}
                  >
                    {IconComponent && (
                      <IconComponent
                        size={20}
                        style={{ color: category.color }}
                      />
                    )}{" "}
                    {category.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>
        {/* Wallets */}
        <Field>
          <FieldLabel htmlFor="wallet">Wallet</FieldLabel>
          <input type="hidden" name="wallet" value={selectedWallet} />
          <Select value={selectedWallet} onValueChange={setSelectedWallet}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {wallets?.data.map((wallet) => {
                const IconComponent =
                  wallet.icon && walletIconMap[wallet.icon]
                    ? walletIconMap[wallet.icon].icon
                    : null;
                return (
                  <SelectItem
                    key={wallet.id}
                    value={wallet.id}
                    onSelect={() => setSelectedWallet(wallet.id)}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    {wallet.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </Field>
        {/* Date */}
        <Field>
          <FieldLabel htmlFor="date">Date</FieldLabel>
          <Input id="date" type="date" name="date" placeholder="Enter Date" />
        </Field>
        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input id="description" type="text" name="description" placeholder="Enter Description" />
        </Field>
        {state.success ? (
          <p className="text-green-500">{state.message}</p>
        ) : (
          <p className="text-red-500">{state.message}</p>
        )}
        {/* Submit */}
        <Field>
          <div className="flex gap-2 w-full justify-end">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
