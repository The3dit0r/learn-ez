import { Roadmap } from "@models/types/roadmap";

export enum RoadmapCheckpointStatus {
  IN_PROGRESS,
  COMPLETED,
  NOT_STARTED,
}

export const attempt = {
  userId: "user_001",
  startedAt: "2025-04-10T08:00:00Z",
  endedAt: "2025-04-10T08:30:00Z",
  quiz: {
    label: "HTML, CSS & JavaScript Basics Assessment",
    createdDate: new Date().toISOString(),
  },
  attemptData: [
    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "A",
        question:
          "Which HTML element is used to define the title of a document?",
        level: 2,
        reference: {
          source: "HTML5 Specification",
          page: 42,
        },
        choices: {
          A: "<title>",
          B: "<header>",
          C: "<heading>",
          D: "<meta>",
        },
      },
      userAnswer: "B",
      pointsReceived: 0,
      answeredAt: "2025-04-10T08:11:00Z",
    },
    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "C",
        question:
          "Which HTML attribute is used to specify a unique identifier for an element?",
        level: 1,
        reference: {
          source: "HTML5 Specification",
          page: 56,
        },
        choices: {
          A: "class",
          B: "name",
          C: "id",
          D: "unique",
        },
      },
      userAnswer: "C",
      pointsReceived: 10,
      answeredAt: "2025-04-10T08:15:30Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "D",
        question:
          "Which CSS property is used to control the space between elements?",
        level: 2,
        reference: {
          source: "CSS: The Definitive Guide",
          page: 118,
        },
        choices: {
          A: "spacing",
          B: "padding",
          C: "indent",
          D: "margin",
        },
      },
      userAnswer: "B",
      pointsReceived: 0,
      answeredAt: "2025-04-10T08:22:15Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "B",
        question:
          "Which JavaScript method is used to add an element to the end of an array?",
        level: 3,
        reference: {
          source: "JavaScript: The Definitive Guide",
          page: 205,
        },
        choices: {
          A: "append()",
          B: "push()",
          C: "addToEnd()",
          D: "concat()",
        },
      },
      userAnswer: "B",
      pointsReceived: 10,
      answeredAt: "2025-04-10T08:30:45Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "A",
        question:
          "Which HTML element is used to create a form that users can submit?",
        level: 2,
        reference: {
          source: "HTML5 Specification",
          page: 147,
        },
        choices: {
          A: "<form>",
          B: "<input>",
          C: "<submit>",
          D: "<field>",
        },
      },
      userAnswer: "A",
      pointsReceived: 10,
      answeredAt: "2025-04-10T08:42:10Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "C",
        question: "In CSS, which property is used to change the text color?",
        level: 1,
        reference: {
          source: "CSS: The Definitive Guide",
          page: 72,
        },
        choices: {
          A: "text-color",
          B: "font-color",
          C: "color",
          D: "text-style",
        },
      },
      userAnswer: "B",
      pointsReceived: 0,
      answeredAt: "2025-04-10T08:50:30Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "D",
        question:
          "Which method would you use to round a number down to the nearest integer in JavaScript?",
        level: 3,
        reference: {
          source: "JavaScript: The Definitive Guide",
          page: 129,
        },
        choices: {
          A: "Math.round()",
          B: "Math.ceiling()",
          C: "Math.random()",
          D: "Math.floor()",
        },
      },
      userAnswer: "A",
      pointsReceived: 0,
      answeredAt: "2025-04-10T09:05:45Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "B",
        question:
          "Which HTML5 element is used to specify a footer for a document or section?",
        level: 2,
        reference: {
          source: "HTML5 Specification",
          page: 183,
        },
        choices: {
          A: "<bottom>",
          B: "<footer>",
          C: "<end>",
          D: "<section>",
        },
      },
      userAnswer: "D",
      pointsReceived: 0,
      answeredAt: "2025-04-10T09:13:20Z",
    },

    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "A",
        question: "Which CSS layout model treats elements as flexible boxes?",
        level: 3,
        reference: {
          source: "CSS: The Definitive Guide",
          page: 251,
        },
        choices: {
          A: "Flexbox",
          B: "Block model",
          C: "Grid layout",
          D: "Float model",
        },
      },
      userAnswer: "A",
      pointsReceived: 10,
      answeredAt: "2025-04-10T09:25:00Z",
    },
    {
      question: {
        maxScore: 10,
        minScore: 0,
        passingScore: 6,
        answer: "C",
        question:
          "Which JavaScript function is used to parse a string to an integer?",
        level: 2,
        reference: {
          source: "JavaScript: The Definitive Guide",
          page: 98,
        },
        choices: {
          A: "Number()",
          B: "toInteger()",
          C: "parseInt()",
          D: "parseNumber()",
        },
      },
      userAnswer: "C",
      pointsReceived: 10,
      answeredAt: "2025-04-10T09:36:30Z",
    },
  ],
};

export const roadmap: Roadmap = {
  id: "roadmap-001",
  label: "Frontend Development Roadmap",
  description: "A beginner-friendly roadmap to learn frontend development.",
  createdAt: new Date(),
  creatorId: "user-123",
  startNode: {
    label: "HTML Basics",
    description: "Learn the structure of web pages using HTML.",
    content: [
      {
        label: "Intro to HTML",
        status: RoadmapCheckpointStatus.COMPLETED,
        description: "Understand what HTML is and why it's used.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML",
            referenceId: "ref-001",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Elements",
        status: RoadmapCheckpointStatus.COMPLETED,
        description:
          "Learn about different HTML elements like div, p, h1-h6, etc.",
        referenceMaterial: [],
      },
      {
        label: "HTML Basics",
        status: RoadmapCheckpointStatus.COMPLETED,
        description:
          "Understand what HTML is and learn the fundamental structure of HTML documents.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html",
            referenceId: "ref-001",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Document Structure",
        status: RoadmapCheckpointStatus.COMPLETED,
        description:
          "Learn about DOCTYPE, html, head, and body elements to create proper HTML documents.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure",
            referenceId: "ref-002",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Text Elements",
        status: RoadmapCheckpointStatus.COMPLETED,
        description:
          "Master headings, paragraphs, lists, and other essential text formatting elements.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element#text_content",
            referenceId: "ref-003",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Links",
        status: RoadmapCheckpointStatus.IN_PROGRESS,
        description:
          "Create hyperlinks to connect web pages and resources using anchor tags.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
            referenceId: "ref-004",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Images & Media",
        status: RoadmapCheckpointStatus.NOT_STARTED,
        description:
          "Embed images, audio, and video content in your web pages.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
            referenceId: "ref-005",
            referenceCollection: "web-docs",
          },
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video",
            referenceId: "ref-006",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Tables",
        status: RoadmapCheckpointStatus.NOT_STARTED,
        description: "Structure tabular data using HTML table elements.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
            referenceId: "ref-007",
            referenceCollection: "web-docs",
          },
        ],
      },
      {
        label: "HTML Forms",
        status: RoadmapCheckpointStatus.NOT_STARTED,
        description: "Create interactive forms to collect user input.",
        referenceMaterial: [
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            referenceId: "ref-008",
            referenceCollection: "web-docs",
          },
          {
            referenceContent:
              "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
            referenceId: "ref-009",
            referenceCollection: "web-docs",
          },
        ],
      },
    ],
    nextMilestone: {
      label: "CSS Fundamentals",
      description: "Style your pages using CSS.",
      content: [
        {
          label: "CSS Syntax",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description: "Basic CSS syntax and how it applies styles.",
          referenceMaterial: [],
        },
        {
          label: "Selectors and Properties",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description: "Learn how to target elements and style them.",
          referenceMaterial: [],
        },
        {
          label: "CSS Selectors",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description:
            "Learn different ways to select HTML elements for styling.",
          referenceMaterial: [
            {
              referenceContent:
                "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors",
              referenceId: "css-ref-001",
              referenceCollection: "web-docs",
            },
          ],
        },
        {
          label: "CSS Box Model",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description:
            "Understand content, padding, borders, and margins in CSS layout.",
          referenceMaterial: [
            {
              referenceContent:
                "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model",
              referenceId: "css-ref-002",
              referenceCollection: "web-docs",
            },
          ],
        },
        {
          label: "CSS Flexbox",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description: "Create flexible layouts with the CSS Flexbox module.",
          referenceMaterial: [
            {
              referenceContent:
                "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
              referenceId: "css-ref-003",
              referenceCollection: "web-docs",
            },
            {
              referenceContent:
                "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
              referenceId: "css-ref-004",
              referenceCollection: "blog-tutorials",
            },
          ],
        },
        {
          label: "CSS Grid",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description: "Master two-dimensional layouts with CSS Grid.",
          referenceMaterial: [
            {
              referenceContent:
                "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
              referenceId: "css-ref-005",
              referenceCollection: "web-docs",
            },
          ],
        },
        {
          label: "CSS Animations",
          status: RoadmapCheckpointStatus.NOT_STARTED,
          description:
            "Create engaging animations using CSS transitions and keyframes.",
          referenceMaterial: [
            {
              referenceContent:
                "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations",
              referenceId: "css-ref-006",
              referenceCollection: "web-docs",
            },
          ],
        },
      ],
      nextMilestone: {
        label: "JavaScript Basics",
        description: "Add interactivity using JavaScript.",
        content: [
          {
            label: "Variables and Data Types",
            status: RoadmapCheckpointStatus.NOT_STARTED,
            description: "Introduction to JS variables and types.",
            referenceMaterial: [],
          },
          {
            label: "Functions and Events",
            status: RoadmapCheckpointStatus.NOT_STARTED,
            description: "Write functions and handle user events.",
            referenceMaterial: [],
          },
          {
            label: "JavaScript Syntax",
            status: RoadmapCheckpointStatus.NOT_STARTED,

            description:
              "Learn the basic syntax, variables, and data types in JavaScript.",
            referenceMaterial: [
              {
                referenceContent:
                  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
                referenceId: "js-ref-001",
                referenceCollection: "web-docs",
              },
            ],
          },
          {
            label: "JavaScript Functions",
            status: RoadmapCheckpointStatus.NOT_STARTED,

            description:
              "Master function declarations, expressions, and arrow functions.",
            referenceMaterial: [
              {
                referenceContent:
                  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
                referenceId: "js-ref-002",
                referenceCollection: "web-docs",
              },
            ],
          },
          {
            label: "DOM Manipulation",
            status: RoadmapCheckpointStatus.NOT_STARTED,
            description:
              "Learn to interact with HTML elements through the Document Object Model.",
            referenceMaterial: [
              {
                referenceContent:
                  "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
                referenceId: "js-ref-003",
                referenceCollection: "web-docs",
              },
            ],
          },
          {
            label: "JavaScript Events",
            status: RoadmapCheckpointStatus.NOT_STARTED,
            description:
              "Handle user interactions with event listeners and callbacks.",
            referenceMaterial: [
              {
                referenceContent:
                  "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
                referenceId: "js-ref-004",
                referenceCollection: "web-docs",
              },
            ],
          },
          {
            label: "Asynchronous JavaScript",
            status: RoadmapCheckpointStatus.NOT_STARTED,
            description:
              "Work with Promises, async/await, and fetch API for handling asynchronous operations.",
            referenceMaterial: [
              {
                referenceContent:
                  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
                referenceId: "js-ref-005",
                referenceCollection: "web-docs",
              },
              {
                referenceContent:
                  "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
                referenceId: "js-ref-006",
                referenceCollection: "web-docs",
              },
            ],
          },
        ],
        nextMilestone: {
          label: "DOM Manipulation",
          description: "Learn how to manipulate HTML using JavaScript.",
          content: [
            {
              label: "Query Selectors",
              status: RoadmapCheckpointStatus.NOT_STARTED,
              description: "Use JS to find and select elements.",
              referenceMaterial: [],
            },
            {
              label: "Modifying Elements",
              status: RoadmapCheckpointStatus.NOT_STARTED,
              description: "Change content and attributes of HTML elements.",
              referenceMaterial: [],
            },
          ],
          nextMilestone: {
            label: "Project: Build a Portfolio Page",
            description: "Apply your knowledge to build a personal portfolio.",
            content: [
              {
                label: "Create the Layout",
                status: RoadmapCheckpointStatus.NOT_STARTED,
                description: "Use HTML and CSS to structure your site.",
                referenceMaterial: [],
              },
              {
                label: "Add Interactivity",
                status: RoadmapCheckpointStatus.NOT_STARTED,
                description: "Use JavaScript to enhance user experience.",
                referenceMaterial: [],
              },
            ],
          },
        },
      },
    },
  },
};
