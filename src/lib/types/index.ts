export type TGender = "male" | "female" | "not_specified"

export type TUser = {
  id: string
  name: string
  email: string
  image: string
  gender: TGender
  created_at: string
  updated_at: string
}

export type TWalletType = "cash" | "bank" | "e-wallet"

export type TWallets = {
  id: string
  user_id: string
  name: string
  balance: number
  type: TWalletType
  created_at: string
  updated_at: string
}

export type TCategoryType = "income" | "expense"

export type TCategories = {
  id: string
  user_id: string
  name: string
  type: TCategoryType
  icon: string
  color: string
  created_at: string
  updated_at: string
}

export type TTransactions = {
  id: string
  user_id: string
  wallet_id: string
  category_id: string
  type: TCategoryType
  amount: number
  description: string
  transaction_date: string
  created_at: string
}

export type TBudgets = {
  id: string
  user_id: string
  category_id: string
  amount: number
  period: string
  start_date: string
  end_date: string
  created_at: string
}

export type TFinancialGoalStatus = "ongoing" | "completed"

export type TFinancialGoal = {
  id: string
  user_id: string
  name: string
  current_amount: number
  target_amount: number
  target_date: string
  status: TFinancialGoalStatus
  created_at: string
}
