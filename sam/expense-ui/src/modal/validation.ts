interface Validation {
    required?: {
        value: boolean;
        message: string;
      };
      pattern?: {
        value: string;
        message: string;
      };
      custom?: {
        isValid: (value: string) => boolean;
        message: string;
      };
}

export type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;