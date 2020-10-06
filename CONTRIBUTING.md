# Contribution guide

We are glad you are interested in contributing! Here you will find a few steps to get you started.

---

### Table of contents

[Set-up and installation](#set-up-and-installation)

[Contributing](#contributing)

[Coding conventions](#coding-conventions)

[License](#license)

[References](#references)

---

### Set-up and installation

Since you are going to contribute, you will need the developer dependencies listed in package.json and your own copy of the project. Because of that, the installation process is different than what you would do if you just wanted to use the library.

Here are the steps:

0. [Fork the repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo). This way you will have your own copy of the project.
1. Open up your favorite terminal and navigate to the directory in which you want to install the library.
2. Clone the repository with `git clone url`. Replace url with the fork you created.
3. cd into the directory: `cd js-crazychess-lib`.
4. Run `yarn install` (or just `yarn`). If you are using npm instead, run `npm install`.
5. After step 4, you now should have all the developer dependencies. To make sure, run `yarn test` (or `npm test`).
6. If the tests are run successfully, congratulations! You are now ready to [contribute](#contributing).

### Contributing

The project does not have a strict policy about what you should do when contributing. The only thing we ask for is that, if you implement a new feature, please implement tests for it too.

Here are a few steps if you don't know where to start:

0. Visit [the issues tab](https://github.com/Guilherme-Vasconcelos/js-crazychess-lib/issues) and check if there are issues that you would like to work on.
1. Found an issue? Before starting, please check its comments or [the backlog kanban](https://github.com/Guilherme-Vasconcelos/js-crazychess-lib/projects/1) to make sure there are no people working on it already. If there are not, you can post a comment telling me to assign you the issue.
2. Implement the feature and [unit tests](https://jestjs.io/docs/en/getting-started.html). If the installation steps were successful, you should already have Jest installed on your project.
3. Run `yarn coverage` (or `npm coverage`). What is the difference between `yarn coverage` and `yarn test`? Well, they both essentially do the same thing: run your tests. The difference is that this project has been set-up so that, when you run `yarn coverage`, not only your tests will be run, but you will also be able to see the testing coverage. This way you will know if you have implemented tests for all the new features you created.
4. If all the tests pass, you can now [commit the changes and push them to your fork](https://dont-be-afraid-to-commit.readthedocs.io/en/latest/git/commandlinegit.html).
5. [Create a pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) so your changes can be merged into the official project.
6. Congratulations! Now your new code will be tested and reviewed, and if everything is okay it will be merged into the official repository. We will warn you if there are changes to be made, so don't worry.

### Coding conventions

Here are a few conventions I follow when I write code to this library. It is good that everyone follows the same conventions so we have the project with the same standards.

0. If you needed to create a function or method that will not be useful for people using the library and is only meant for internal use, please start its name with an underline (i.e. _). For example, there is a method called `_updateAllLegalSquares`, which updates the legal squares available for all pieces at the board. Since this method is only useful for internal library usage, it must start with an underline. If you have ever used other Object Oriented programming languages, you can consider those methods to be "private".

1. The "private" methods should preferably come only after the "public" methods. If you have a look at src/board.js, you can see that all methods that appear first do not have the underline; this helps to find the most useful methods first.

2. Use a consistent coding style, such as four spaces for indentation, docstrings explaining what your methods do, etc. Don't worry, we will warn you if there are any adaptations you need to do when you submit a pull request.

3. If you are comfortable with it, you can use [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development), which basically means to implement the tests first, and the new feature only after the tests. This helps to keep track of what you still need to implement, since the tests will fail until the new feature is ready.

### License

By contributing, you agree that your contributions will be licensed under the GNU General Public License, version 3 or later.

### References

Some parts of this document were adapted from [briandk's CONTRIBUTING.md template](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62).
