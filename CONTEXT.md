# TopUp Transactions

This context describes the language for selling and fulfilling digital products through client-owned accounts. Mobile topup is the first product type, but the platform language should remain broad enough for other digital products.

## Language

**Client Account**:
The account that owns API keys, a wallet, and transaction history.
_Avoid_: Customer, API client, merchant account

**User**:
The application identity used for login and roles; in this system, a user may represent a client account.
_Avoid_: Treating User as the product-facing name for client-owned balances or transactions

**Wallet**:
The DZD balance holder for a client account, split between funds available for new transactions and funds reserved for in-flight transactions.
_Avoid_: Account balance, ledger

**Deposit**:
An administrative credit that increases a wallet's available DZD balance.
_Avoid_: Payment, recharge, topup

**Digital Product**:
A sellable digital service or value product offered by the platform, such as mobile topup, gift cards, gaming credits, vouchers, or subscriptions.
_Avoid_: Topup as the umbrella term

**Product Type**:
The category that determines what information a transaction needs and how fulfillment is interpreted.
_Avoid_: Category, provider type

**MOBILE_TOPUP**:
The first product type, used for prepaid mobile credit delivered to a phone number.
_Avoid_: Treating mobile topup as the whole platform model

**Offer**:
A purchasable configuration under a digital product.
_Avoid_: SKU, plan, package

**Transaction**:
A client account's request to purchase or fulfill an offer.
_Avoid_: Order, topup

**API Key**:
A credential created for a client account so an integration can act as that account.
_Avoid_: Token, password

**Provider**:
The fulfillment boundary responsible for delivering a transaction outcome.
_Avoid_: Operator, gateway

**Sandbox Provider**:
A provider used to simulate fulfillment outcomes before a real provider is connected.
_Avoid_: Fake operator, mock product

**external_id**:
An optional client-supplied reconciliation identifier for a transaction, unique per client account when present.
_Avoid_: Reference, order ID
