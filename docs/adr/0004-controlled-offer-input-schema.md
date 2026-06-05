# Controlled Offer Input Schema

Issue 06 makes offers the client-facing catalog entries and stores each offer's required transaction inputs in `inputSchema`. We chose a controlled versioned JSON shape as the source of truth instead of typed amount columns or duplicate columns plus JSON because future digital product types may need different inputs, while the API still needs a stable contract that can be validated before it is returned to clients.

`inputSchema.version` starts at `1`, and v1 fields use `name`, `type`, `required`, and nested `constraints`. The application validates stored schemas on read and fails closed if catalog data does not match the controlled shape. This keeps the catalog flexible for future product types without committing to arbitrary JSON Schema semantics or maintaining two competing sources of truth.
