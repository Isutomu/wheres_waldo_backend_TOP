# wheres_waldo_backend_TOP

> [!NOTE]
> This is a REST-ish API. In the future I plan to refactor to RESTful, but it's not a priority.

<!-- > [!IMPORTANT]
> This is only the 	**backend** of the project. Be sure to also visit [frontend visitor](https://github.com/Isutomu/blog_api_visitor-TOP) and [frontend admin](https://github.com/Isutomu/blog_api_admin-TOP). -->

> [!CAUTION]
> This project is purely meant to be used as a tool for self-improvement, so I sincerely recommend you to not use this. But, in case you do decide to use it either way, please do credit me.

This is the backend of the project [Where's Waldo](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) from TOP.

For this project the flow decided to work with was:

1. Implement expected functionalities
2. Develop the frontend
3. As needed, add new functionalities

Also, I'll be following a somewhat TDD workflow.
"Somewhat" because the focus will be on integration tests instead of unit testing first.

## Future features

> [!IMPORTANT]
> Modifiers ("not priority" and the like) don't imply importance. Most of the time they simply mean that I thought they were too difficult to tackle for now.

- Refactor routes test to better explain what's expected of which route
  - This is a 2 steps job: first, the initialization should be done outside the proper test (things that go on beforeEach); second, the tests itself should be reafactored to lessen the ammount of stuff in it (some things could go in a beforeEach, others just turn them to functions).
- Refactor controllers so that the functions only do really one stuff (e.g. "photos" in get does everything that the route "/photos" asks for it, but some aren't directly related to photos itself. So try to do a distinction between routes and more specifically specialized controllers).
