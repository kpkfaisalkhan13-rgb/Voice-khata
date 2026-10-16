export type TransactionType = 'DEBIT' | 'CREDIT'; // DEBIT = Udhaar diya / Maine diye (قرض دیا), CREDIT = Vasool huay / Maine liye (وصولی)

export interface Customer {
  id: string;
  name: string;
  nameUrdu: string;
  phone: string;
  address?: string;
  balance: number; // Positive = Customer owes merchant (Maine lene hain), Negative = Merchant owes customer (Maine dene hain)
  debtLimit?: number; // Maximum allowed udhaar/debt limit in PKR (قرض کی حد) e.g. 25,000
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  customerNameUrdu: string;
  amount: number;
  type: TransactionType;
  note: string;
  rawTranscript?: string;
  timestamp: string;
}

export interface VoiceParseResult {
  customerName: string;
  customerNameUrdu: string;
  amount: number;
  type: TransactionType;
  rawText: string;
  matchedCustomer: Customer | null;
  exists: boolean;
  notes?: string;
}

export type VoiceIntent = 'ADD_TRANSACTION' | 'SEARCH_ACCOUNT';

export interface VoiceIntentClassification {
  intent: VoiceIntent;
  target_name: string;
  raw_text: string;
}

export interface ExtractedTransaction {
  account_name: string;
  amount: number;
  type: TransactionType;
}

export interface MultiTransactionParseResponse {
  transactions: ExtractedTransaction[];
}

export interface MultiVoiceParseResult {
  intent: VoiceIntent;
  targetName?: string;
  matchedSearchCustomer?: Customer | null;
  transactions: VoiceParseResult[];
  rawText: string;
}

export type VoiceEngineMode = 'LEDGER' | 'CALCULATOR';

export interface VoiceEngineLedgerData {
  account_name: string;
  is_existing_account: boolean;
  amount: number;
  type: TransactionType;
}

export interface VoiceEngineCalculatorData {
  expression: string;
  result: number;
}

export interface VoiceEngineResponse {
  mode: VoiceEngineMode;
  ledger_data: VoiceEngineLedgerData | null;
  calculator_data: VoiceEngineCalculatorData | null;
  raw_text: string;
}

export type CountryCode = 'PK' | 'IN' | 'US';

export interface SubscriptionInfo {
  installedAt: string; // Date user started (Day 1)
  voiceExpiresAt: string | null; // null if unextended, or ISO date
  pdfAnalyticsExpiresAt: string | null;
  lastTxzIdSubmitted?: string;
  lastPaymentMethod?: string;
  paymentPendingPlan?: 'VOICE' | 'PDF_ANALYTICS' | 'COMBO';
  paymentSubmittedAt?: string;
  adminExtendedDays: number;
  tempAccessUntil?: string | null; // 24-hour instant temporary access upon screenshot submission
  paymentScreenshotUrl?: string | null; // base64 or URL of submitted payment receipt
}

export type FinancialTab = 'Khata/Supply';
export type FinancialEntryType = 'Credit' | 'Debit';
export type FinancialMathAction = 'PLUS (+)' | 'MINUS (-)';

export type VoiceParserTab = 'Khata';

export interface KhataVoiceOutput {
  tab: 'Khata';
  original_spoken_text: string;
  person_name: string;
  customer_id?: string;
  parsed_amount: number;
  transaction_type: 'Credit' | 'Debit';
  math_action: 'SUBTRACT' | 'ADD';
}

export type IntelligentVoiceParserResult = KhataVoiceOutput;

export interface FinancialVoiceOutput {
  selected_tab: 'Khata/Supply';
  entry_type: 'Credit' | 'Debit';
  amount: number;
  description: string;
  math_action: 'PLUS (+)' | 'MINUS (-)';
  customerId?: string;
  customerName?: string;
  customerUrdu?: string;
  category?: string;
  tab?: 'Khata';
  original_spoken_text?: string;
  person_name?: string;
  customer_id?: string;
  parsed_amount?: number | null;
  transaction_type?: 'Credit' | 'Debit' | null;
}

export interface AppSettings {
  pin: string;
  biometricEnabled: boolean;
  isLocked: boolean;
  language: 'ur' | 'en' | 'hi' | 'ru';
  country: CountryCode;
  businessName: string;
  onboardingCompleted: boolean;
  groqApiKey: string;
  whisperModel: string;
  shopName: string;
  shopOwner: string;
  currency: string;
  lastBackupTime: string | null;
  subscription: SubscriptionInfo;
  defaultDebtLimit: number; // e.g. 25000 PKR / INR
  enableDebtAlerts: boolean;
}

export interface UserVoiceCorrection {
  id: string;
  spoken_transcript: string;
  corrected_number: number;
  updated_at: string;
}

export type SmartPasteType = 'Jama' | 'Udhaar'; // Jama = Credit, Udhaar = Debit

export interface SmartPasteParsedEntry {
  id: string;
  name: string;
  amount: number;
  type: SmartPasteType;
  original_text: string;
  isExistingKhata: boolean;
  customerExists?: boolean;
  matchedCustomer?: Customer | null;
  isChecked: boolean;
  learnedCorrectionApplied?: boolean;
}

export interface SelfLearningItem {
  id: string;
  wrong: string;
  correct: string;
  context: string;
  updatedAt: string;
}

