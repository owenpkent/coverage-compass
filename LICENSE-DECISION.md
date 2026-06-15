# License decision

**Decided: Apache 2.0.** The full text is in [`LICENSE`](LICENSE); third-party attributions are in [`NOTICE`](NOTICE). Copyright is held by "Owen Kent and Coverage Compass contributors". This decision is final for the project. The rationale and the alternatives that were considered are kept below for the record.

## Why Apache 2.0

- Permissive: anyone can fork, modify, and host it, including for commercial use, without being required to share changes back. The goal is maximum adoption by other state disability coalitions who can point the same engine at their own state's Medicaid rules.
- Strong patent grant: contributors automatically grant patent rights for their contributions, which protects users from contributor patent claims.
- It is the common choice in civic tech and is already used by adjacent state-coalition projects, so it lowers adoption friction.

Lowering adoption friction matters more here than ensuring forks share their changes back. That is the trade Apache 2.0 makes, and it is the right one for a tool meant to be lifted into other states.

## How contributions are licensed

Contributions are inbound equals outbound: by submitting a contribution you agree it is licensed under Apache 2.0, per section 5 of the license. No separate contributor license agreement (CLA) is required. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Alternatives considered

- **AGPLv3** (strong network copyleft) was considered because the threat model centers on what a host can do with user data, and AGPL would force a modifying host to publish its changes. It was not chosen because the privacy guarantee here comes from architecture (everything runs on the user's device, so there is no host holding the data), not from the license, and because copyleft would narrow the adoption breadth that is the main goal. The tool is auditable by reading its source regardless of license.
- **MIT** was set aside as too permissive: it loses the patent grant Apache 2.0 provides.
- **GPLv3** does not close the network-use (SaaS) gap that motivated looking at AGPL in the first place.
- **CC0** (public-domain dedication) loses contributor patent and attribution protection.

## If this ever needs to change

Relicensing is straightforward today because there are few external contributors. Any future change would be made in the open, with contributor agreement, and recorded here.
