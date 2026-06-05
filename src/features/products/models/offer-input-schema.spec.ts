import {
  InvalidOfferInputSchemaError,
  OfferInputSchema,
  parseOfferInputSchema,
} from '@products/models';

describe('parseOfferInputSchema', () => {
  const schema: OfferInputSchema = {
    version: 1,
    fields: [
      {
        name: 'msisdn',
        type: 'string',
        required: true,
        constraints: { format: 'DZ_E164_MSISDN' },
      },
      {
        name: 'amount',
        type: 'integer',
        required: true,
        constraints: { min: 100, max: 10000, currency: 'DZD' },
      },
    ],
  };

  it('returns a controlled v1 schema', () => {
    expect(parseOfferInputSchema(schema)).toEqual(schema);
  });

  it('rejects unsupported versions', () => {
    expect(() => parseOfferInputSchema({ ...schema, version: 2 })).toThrow(
      InvalidOfferInputSchemaError,
    );
  });

  it('rejects missing required fields', () => {
    expect(() =>
      parseOfferInputSchema({
        ...schema,
        fields: schema.fields.filter((field) => field.name !== 'amount'),
      }),
    ).toThrow(InvalidOfferInputSchemaError);
  });

  it('rejects invalid amount constraints', () => {
    expect(() =>
      parseOfferInputSchema({
        ...schema,
        fields: schema.fields.map((field) =>
          field.name === 'amount'
            ? {
                ...field,
                constraints: { min: 10000, max: 100, currency: 'DZD' },
              }
            : field,
        ),
      }),
    ).toThrow(InvalidOfferInputSchemaError);
  });
});
