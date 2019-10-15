<h1 align="center">
  <br>
  <img src="https://i.imgur.com/Ic73jyd.png" alt="downshift logo" title="downshift logo" width="300">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">
❓ Better experience of asking and answering code-related questions ❓
</p>

<hr />

[![PRs Welcome][prs-badge]][prs]
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
[![Code of Conduct][coc-badge]][coc]
[![Join the community on Spectrum][spectrum-badge]][spectrum]

## The problem

Answering code-related [StackOverflow][stackoverflow] questions can be frustrating and time-consuming, especially if you'd like to debug author's code. You'd need to copy that code to your code editor and install dependencies manually one by one.

## The solution

We're making an experience where a person who asks for help re-creates project setup in our web app using already existing online code editors such as [CodeSandbox][codesandbox] and [StackBlitz][stackblitz], so the person who would like to help does not have to.

- [Contributing](#contributing)
  - [Ground Rules](#ground-rules)
  - [Codebase](#codebase)
    - [Technologies](#technologies)
    - [Folder Structure](#folder-structure)
    - [First time setup](#first-time-setup)
    - [Code Style](#code-style)
  - [First time setup](#first-time-setup)
  - [Installation](#installation)
  - [Development](#development)
  - [Roadmap](https://github.com/codeleakteam/codeleak/projects/1)

## Contributing

**We heartily welcome any and all contributions that match our engineering standards!**

That being said, this codebase isn't your typical open source project because it's not a library or package with a limited scope—it's our entire product.

### Ground Rules

We expect discussions in issues and pull requests to stay positive, productive, and respectful. Remember: there are real people on the other side of that screen!
Please read our [Code of conduct][coc].

#### Reporting a bug or discussing a feature idea

If you found a technical bug on Codeleak or have ideas for features we should implement, the issue tracker is the best place to share your ideas. Make sure to follow the issue template and you should be golden! ([click here to open a new issue](https://github.com/codeleakteam/codeleak/issues/new))

#### Fixing a bug or implementing a new feature

If you find a bug on Codeleak and open a PR that fixes it we'll review it as soon as possible to ensure it matches our engineering standards.
Want to fix a bug or implement an agreed-upon feature? Great, jump to the [local setup instructions](#first-time-setup)!

### Codebase

#### Technologies

- **NextJS**: We decided to go with NextJS on front-end, which is a React framework for SSR and SEO-friendly React Apps
- **Django**: Our backend is built in Django(Python)
- **PostgreSQL**: Data storage
- **Mailgun**: Emails
- **StackBlitz**: [SDK][stackblitz-sdk]
- **CodeSandbox**: [Embedding](codesandbox-embed)

#### Folder structure

```sh
codeleak/                 # NextJS App
├── django-backend        # API server
```

#### Code Style

We run Prettier on-commit, which means you can write code in whatever style you want and it will be automatically formatted according to the common style when you run `git commit`.

### First time setup

The first step to running Codeleak locally is downloading the code by cloning the repository:

```sh
git clone git@github.com:codeleakteam/codeleak.git
```

If you get `Permission denied` error using `ssh` refer [here](https://help.github.com/articles/error-permission-denied-publickey/)
or use `https` link as a fallback.

```sh
git clone https://github.com/codeleakteam/codeleak.git
```

### Installation

1. **Install Docker**: See [the Docker documentation](https://www.docker.com/get-started) for instructions on installing it with your OS.
2. **Install yarn**: We use [yarn](https://yarnpkg.com) to handle our JavaScript dependencies.
3. **Run the initial setup script(A docker network will be created and env file(env-example) will be instantiated in the django-backend/env dir)**: `yarn run setup:dev`
4. **Run the initial db migrations(You will be asked to create a new super user account)**: `yarn run setup:db`
5. **Install the NextJS dependencies**: `yarn`

### Development

1. Run API Server: `yarn run dev:api`
2. Run NextJS App: `yarn run dev:next`

You should be able to visit the NextJS app at `localhost:3000` and login via recently created super-user account! 🎉
API server should be running running at `localhost:8000`, and admin dashboard is available at `localhost:8000/admin`.

## Backers

No backers yet! 🙏
[[Become a backer](https://patreon.com/codeleak)]

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a
link to your website.
[[Become a sponsor](https://patreon.com/codeleak)]

[stackoverflow]: https://stackoverflow.com
[codesandbox]: https://codesandbox.io
[codesandbox-embed]: https://codesandbox.io/docs/embedding
[stackblitz]: https://stackblitz.com
[stackblitz-sdk]: https://www.npmjs.com/package/@stackblitz/sdk
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/codeleakteam/codeleak/blob/master/CODE_OF_CONDUCT.md
[spectrum-badge]: https://withspectrum.github.io/badge/badge.svg
[spectrum]: https://spectrum.chat/codeleak

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/zivanovicb1"><img src="https://avatars2.githubusercontent.com/u/28143370?v=4" width="100px;" alt="Branko Zivanovic"/><br /><sub><b>Branko Zivanovic</b></sub></a><br /><a href="https://github.com/Branko Zivanovic/codeleak/commits?author=zivanovicb1" title="Code">💻</a> <a href="#design-zivanovicb1" title="Design">🎨</a> <a href="https://github.com/Branko Zivanovic/codeleak/commits?author=zivanovicb1" title="Documentation">📖</a> <a href="#ideas-zivanovicb1" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-zivanovicb1" title="Reviewed Pull Requests">👀</a> <a href="#infra-zivanovicb1" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Branko Zivanovic/codeleak/issues?q=author%3Azivanovicb1" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/MilePaor"><img src="https://avatars3.githubusercontent.com/u/20985604?v=4" width="100px;" alt="Bojan Milicev"/><br /><sub><b>Bojan Milicev</b></sub></a><br /><a href="https://github.com/Branko Zivanovic/codeleak/commits?author=MilePaor" title="Code">💻</a> <a href="#ideas-MilePaor" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Branko Zivanovic/codeleak/issues?q=author%3AMilePaor" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/gengar3"><img src="https://avatars2.githubusercontent.com/u/23714920?v=4" width="100px;" alt="gengar3"/><br /><sub><b>gengar3</b></sub></a><br /><a href="https://github.com/Branko Zivanovic/codeleak/issues?q=author%3Agengar3" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/acanik84"><img src="https://avatars1.githubusercontent.com/u/3494731?v=4" width="100px;" alt="acanik84"/><br /><sub><b>acanik84</b></sub></a><br /><a href="https://github.com/Branko Zivanovic/codeleak/issues?q=author%3Aacanik84" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
