# Next URL Shortener

<span>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white" />
    <img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white" />
</span>

A basic URL shortener service to distribute and handle easily manageable links. Mostly an exploration into how NextJS works.


## Implementation

This is the catalogue of the primary feature implementations:
- **Rerouting of Links**: When a shortened URL is entered, a custom middleware written in `middleware.ts` is executed that pulls the shortened link, retrieves the corresponding larger link from the Redis database and redirects to it.
- **Link Shortening**: Done using a simple algorithm that is NOT bijective. It employs selection of 6 random characters from a-z, A-Z and 0-9. The algorithm can definitely be improved.
- **Logging**: Winston is used for logging app data (wherever appropriate).
- **Responses**: Custom response classes are used to support better handling of APIs. They are made in `responses.ts` and `enums.ts`. The goal here was standardization. However, the NextResponse classes are extremely limited with respect to the support for different response codes and an alternative needs to be explored.
- **Redis**: Connecting to Redis is extremely simple and it has been done in `redis.ts`.


## Checkpoints

- [x] Functional app.
- [ ] Users module.
- [x] Logging.
- [ ] Ability of users to see all their links.
- [x] Pricing Page.
- [ ] Home Page.
- [ ] Fix Navbar.
- [ ] Show actual domain of the app rather than localhost when link gets generated.
- [ ] Deployment.
- [x] Footer.


## Resources Used

- Redis database from <a href="https://upstash.com/">Upstash</a>.
