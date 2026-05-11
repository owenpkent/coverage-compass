# License decision

**Decided: Apache 2.0.** See `LICENSE` and `NOTICE` at the repo root. Reasoning preserved below.

If CCDC's preference after the scoping conversation is AGPLv3 instead, relicensing is straightforward at this stage (no external contributors yet).

---


We need to pick a license before v0.1 ships publicly. Two candidates.

## Apache 2.0

- Permissive: anyone can fork, modify, host, including for commercial use, without sharing changes back.
- Strong patent grant: contributors automatically grant patent rights for their contributions; protects users from contributor patent claims.
- Most common in civic tech and broadly adopted by other state coalitions.

**Argument for Apache 2.0:** maximizes the chance other state disability coalitions can pick this up and adapt it to their state's Medicaid system. Lowering adoption friction matters more than ensuring forks share back.

## AGPLv3

- Strong copyleft, including for network use: if anyone hosts a modified version as a service, they must share their changes under the same license.
- Closes the "SaaS loophole" in GPL.
- Signals intent: this tool is and stays in the commons.

**Argument for AGPLv3:** the threat model already centers on what a host can do with user data. Making the host share their changes back means user-facing privacy claims are auditable in any deployment.

## Other options considered

- **MIT:** too permissive; loses the patent grant Apache offers.
- **GPLv3:** doesn't close the SaaS loophole.
- **CC0:** dedication to public domain; loses contributor protection.

## Recommendation

Likely **Apache 2.0** for maximum adoption by other coalitions, with a `CONTRIBUTING.md` that includes a clear contributor license agreement and explicit statements about the privacy commitment.

Open to AGPLv3 if CCDC's preference (after hearing both sides) is to prioritize keeping forks in the commons over adoption breadth.

## Decision deadline

Before any public commits or release tags. Probably part of the CCDC scoping conversation.
