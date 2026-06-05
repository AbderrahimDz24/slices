export const OFFER_INPUT_SCHEMA_VERSION = 1;

export type OfferInputFieldType = 'string' | 'integer';

export interface OfferInputField {
  name: string;
  type: OfferInputFieldType;
  required: boolean;
  constraints: Record<string, string | number | boolean>;
}

export interface OfferInputSchema {
  version: typeof OFFER_INPUT_SCHEMA_VERSION;
  fields: OfferInputField[];
}

export class InvalidOfferInputSchemaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidOfferInputSchemaError';
  }
}

export function parseOfferInputSchema(value: unknown): OfferInputSchema {
  if (!isRecord(value)) {
    throw new InvalidOfferInputSchemaError('inputSchema must be an object');
  }

  if (value.version !== OFFER_INPUT_SCHEMA_VERSION) {
    throw new InvalidOfferInputSchemaError('inputSchema version must be 1');
  }

  if (!Array.isArray(value.fields)) {
    throw new InvalidOfferInputSchemaError(
      'inputSchema fields must be an array',
    );
  }

  const fields = value.fields.map(parseField);
  const fieldNames = fields.map((field) => field.name);
  for (const requiredName of ['msisdn', 'amount']) {
    if (!fieldNames.includes(requiredName)) {
      throw new InvalidOfferInputSchemaError(
        `inputSchema must include ${requiredName}`,
      );
    }
  }

  return { version: OFFER_INPUT_SCHEMA_VERSION, fields };
}

function parseField(value: unknown): OfferInputField {
  if (!isRecord(value)) {
    throw new InvalidOfferInputSchemaError('field must be an object');
  }

  if (typeof value.name !== 'string' || value.name.length === 0) {
    throw new InvalidOfferInputSchemaError('field name must be a string');
  }

  if (value.type !== 'string' && value.type !== 'integer') {
    throw new InvalidOfferInputSchemaError('field type is unsupported');
  }

  if (typeof value.required !== 'boolean') {
    throw new InvalidOfferInputSchemaError('field required must be a boolean');
  }

  if (!isRecord(value.constraints)) {
    throw new InvalidOfferInputSchemaError(
      'field constraints must be an object',
    );
  }

  const field: OfferInputField = {
    name: value.name,
    type: value.type,
    required: value.required,
    constraints: value.constraints as Record<string, string | number | boolean>,
  };

  validateKnownField(field);
  return field;
}

function validateKnownField(field: OfferInputField): void {
  if (field.name === 'msisdn') {
    if (
      field.type !== 'string' ||
      field.required !== true ||
      field.constraints.format !== 'DZ_E164_MSISDN'
    ) {
      throw new InvalidOfferInputSchemaError('msisdn field is invalid');
    }
    return;
  }

  if (field.name === 'amount') {
    const { min, max, currency } = field.constraints;
    if (
      field.type !== 'integer' ||
      field.required !== true ||
      !Number.isInteger(min) ||
      !Number.isInteger(max) ||
      typeof min !== 'number' ||
      typeof max !== 'number' ||
      min < 0 ||
      max < min ||
      currency !== 'DZD'
    ) {
      throw new InvalidOfferInputSchemaError('amount field is invalid');
    }
    return;
  }

  throw new InvalidOfferInputSchemaError(`unsupported field ${field.name}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
