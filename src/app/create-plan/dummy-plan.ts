import { GoStudyPlanWeekGapOne } from '../Models/weeks';

// Shown when /study-plan fails (e.g. Gemini API key issue) so the UI can still
// be demoed end-to-end: preview, save, and later attempt the MCQs from the
// plan description page. Structurally identical to a real generated plan.
export const DUMMY_STUDY_PLAN: GoStudyPlanWeekGapOne = {
  title: "Linear Algebra in 22 Days: A Beginner's Guide",
  introduction:
    "This 22-day plan introduces you to the essentials of Linear Algebra, dedicating 2 focused hours a day. You'll build up from vectors and matrices to solving systems of equations, understanding vector spaces, and finally getting an intuitive grasp of eigenvalues and eigenvectors.",
  overallStrategy:
    "The plan progresses in four stages: foundations (vectors & matrices), solving systems of equations, vector spaces & transformations, and a final review. Each day pairs a short concept with a hands-on revision exercise so the ideas stick.",
  forNextTopic:
    "Once comfortable with these fundamentals, the natural next step is diving deeper into eigen-decomposition, singular value decomposition (SVD), and applications in machine learning.",
  finalReview:
    "Go back through your daily revision exercises and try solving them again without notes - if you can, you've genuinely internalized the concept.",
  further: "",
  motivationMessage:
    "You've just built a real foundation in one of the most widely-used branches of mathematics - from computer graphics to machine learning, linear algebra is everywhere. Keep practicing and it'll keep paying off!",
  weeklyBreakdown: [
    {
      week: "Week 1",
      topic: ["Foundations", "Understand vectors, vector operations, and basic matrix concepts as the building blocks of linear algebra."],
      resources: [
        "https://www.3blue1brown.com/topics/linear-algebra",
        "https://www.khanacademy.org/math/linear-algebra"
      ],
      activities: [
        "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces",
        "https://www.symbolab.com/solver/matrix-calculator"
      ],
      dailyBreakdown: [
        {
          day: "Day 1",
          description: ["Learn what a vector is, how to represent it in 2D/3D, and how to add and subtract vectors."],
          whyToLearn: ["Vectors are the fundamental objects linear algebra is built on."],
          revision: "Draw and add two vectors on paper by hand."
        },
        {
          day: "Day 2",
          description: ["Learn scalar multiplication of vectors and the idea of vector magnitude and direction."],
          whyToLearn: ["Scaling vectors is used constantly in physics, graphics, and machine learning."],
          revision: "Compute the magnitude of three different vectors."
        },
        {
          day: "Day 3",
          description: ["Introduce matrices as a grid of numbers and learn matrix notation - rows, columns, and dimensions."],
          whyToLearn: ["Matrices let us represent and solve many equations at once."],
          revision: "Write down a 3x3 matrix and label its rows and columns."
        },
        {
          day: "Day 4",
          description: ["Learn matrix addition, subtraction, and scalar multiplication."],
          whyToLearn: ["These are the basic building blocks before matrix multiplication."],
          revision: "Add two 2x2 matrices by hand."
        },
        {
          day: "Day 5",
          description: ["Learn matrix multiplication and why the dimensions must match."],
          whyToLearn: ["Matrix multiplication represents combining transformations."],
          revision: "Multiply a 2x2 matrix by a 2x1 vector."
        },
        {
          day: "Day 6",
          description: ["Learn the identity matrix and the transpose of a matrix."],
          whyToLearn: ["The identity matrix behaves like the number 1 in matrix algebra."],
          revision: "Find the transpose of a 3x2 matrix."
        },
        {
          day: "Day 7",
          description: ["Get an intuitive introduction to the determinant of a 2x2 matrix."],
          whyToLearn: ["The determinant tells us if a matrix transformation preserves area or volume."],
          revision: "Calculate the determinant of two different 2x2 matrices."
        }
      ]
    },
    {
      week: "Week 2",
      topic: ["Linear Systems", "Learn to represent and solve systems of linear equations using matrices."],
      resources: [
        "https://tutorial.math.lamar.edu/Classes/LinAlg/LinAlg.aspx",
        "https://www.khanacademy.org/math/algebra-home/alg-system-of-equations"
      ],
      activities: ["https://www.symbolab.com/solver/system-of-equations-calculator"],
      dailyBreakdown: [
        {
          day: "Day 8",
          description: ["Learn how a system of linear equations can be written as a matrix equation Ax = b."],
          whyToLearn: ["This representation is the basis for every method used to solve linear systems."],
          revision: "Convert two simple equations into matrix form."
        },
        {
          day: "Day 9",
          description: ["Learn Gaussian elimination to reduce a matrix to row echelon form."],
          whyToLearn: ["Gaussian elimination is the standard method to solve linear systems by hand."],
          revision: "Row-reduce a 2x3 augmented matrix."
        },
        {
          day: "Day 10",
          description: ["Continue practicing Gaussian elimination on three-variable systems."],
          whyToLearn: ["Practicing larger systems builds confidence in the method."],
          revision: "Solve a 3-equation, 3-unknown system using elimination."
        },
        {
          day: "Day 11",
          description: ["Learn back-substitution to find the final solution after row reduction."],
          whyToLearn: ["Back-substitution completes the elimination process."],
          revision: "Solve for all variables in a row-reduced system."
        },
        {
          day: "Day 12",
          description: ["Learn what it means for a system to have no solution or infinitely many solutions."],
          whyToLearn: ["Not every system has exactly one solution, and recognizing this matters."],
          revision: "Identify whether two given systems have one, none, or infinite solutions."
        },
        {
          day: "Day 13",
          description: ["Introduce the concept of a matrix inverse and how it can solve Ax = b."],
          whyToLearn: ["The inverse gives a direct, formula-based way to solve systems when it exists."],
          revision: "Verify that a matrix times its inverse gives the identity matrix."
        },
        {
          day: "Day 14",
          description: ["Learn the concept of the rank of a matrix and what it tells us about a system."],
          whyToLearn: ["Rank determines whether a system is solvable and how many solutions it has."],
          revision: "Find the rank of a 3x3 matrix by row reducing it."
        }
      ]
    },
    {
      week: "Week 3",
      topic: ["Vector Spaces", "Explore vector spaces, linear independence, basis, dimension, and linear transformations."],
      resources: [
        "https://www.3blue1brown.com/topics/linear-algebra",
        "https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces"
      ],
      activities: ["https://www.geogebra.org/m/qhrfjqcs"],
      dailyBreakdown: [
        {
          day: "Day 15",
          description: ["Learn the formal definition of a vector space and check it against simple examples."],
          whyToLearn: ["Vector spaces generalize the idea of vectors beyond arrows in 2D/3D."],
          revision: "List three properties every vector space must satisfy."
        },
        {
          day: "Day 16",
          description: ["Learn linear independence and how to check whether a set of vectors is independent."],
          whyToLearn: ["Independence tells us if vectors carry unique, non-redundant information."],
          revision: "Check whether three given vectors are linearly independent."
        },
        {
          day: "Day 17",
          description: ["Learn the concept of a basis and how it spans a vector space."],
          whyToLearn: ["A basis is the minimal set of vectors needed to describe an entire space."],
          revision: "Verify that two vectors form a basis for a 2D plane."
        },
        {
          day: "Day 18",
          description: ["Learn the dimension of a vector space and how it relates to the basis."],
          whyToLearn: ["Dimension tells us how many independent directions a space has."],
          revision: "State the dimension of 3D space and explain why."
        },
        {
          day: "Day 19",
          description: ["Introduce linear transformations and how matrices represent them."],
          whyToLearn: ["Every matrix can be viewed as a function that transforms vectors."],
          revision: "Apply a rotation matrix to a simple vector."
        },
        {
          day: "Day 20",
          description: ["Get an intuitive first look at eigenvalues and eigenvectors."],
          whyToLearn: ["Eigenvectors reveal the directions a transformation stretches without rotating."],
          revision: "Verify that a given vector is an eigenvector of a simple matrix."
        },
        {
          day: "Day 21",
          description: ["Practice finding eigenvalues of a 2x2 matrix using the characteristic equation."],
          whyToLearn: ["Eigenvalues are used extensively in data science, physics, and engineering."],
          revision: "Find the eigenvalues of a 2x2 matrix by hand."
        }
      ]
    },
    {
      week: "Week 4",
      topic: ["Review", "Consolidate everything learned and connect the concepts into one coherent picture."],
      resources: ["https://www.3blue1brown.com/topics/linear-algebra"],
      activities: ["https://www.khanacademy.org/math/linear-algebra"],
      dailyBreakdown: [
        {
          day: "Day 22",
          description: ["Review vectors, matrices, systems of equations, vector spaces, and eigenvalues together."],
          whyToLearn: ["Reviewing ties every topic together into one coherent understanding of linear algebra."],
          revision: "Solve one mixed practice problem covering matrices, systems, and eigenvalues."
        }
      ]
    }
  ],
  mcqs: [
    {
      question: "What is the result of adding the vectors (2, 3) and (1, 5)?",
      options: { A: "(3, 8)", B: "(2, 15)", C: "(1, 2)", D: "(3, 5)" },
      correctAns: "A"
    },
    {
      question: "For matrix multiplication AB to be defined, what must be true about the dimensions of A and B?",
      options: {
        A: "A and B must both be square matrices",
        B: "The number of columns of A must equal the number of rows of B",
        C: "The number of rows of A must equal the number of rows of B",
        D: "A and B must have the same dimensions"
      },
      correctAns: "B"
    },
    {
      question: "What is the determinant of the matrix [[2,0],[0,3]]?",
      options: { A: "5", B: "6", C: "0", D: "1" },
      correctAns: "B"
    },
    {
      question: "In Gaussian elimination, what is the goal of row-reducing a matrix?",
      options: {
        A: "To make all entries zero",
        B: "To convert the matrix into row echelon form to solve the system",
        C: "To find the determinant only",
        D: "To multiply every row by its inverse"
      },
      correctAns: "B"
    },
    {
      question: "A system of linear equations has infinitely many solutions when:",
      options: {
        A: "The equations are inconsistent",
        B: "The rank of the coefficient matrix equals the number of variables",
        C: "The rank of the coefficient matrix is less than the number of variables, and the system is consistent",
        D: "The determinant of the coefficient matrix is non-zero"
      },
      correctAns: "C"
    },
    {
      question: "What does it mean for a matrix A to have an inverse A⁻¹?",
      options: {
        A: "A times A⁻¹ equals the zero matrix",
        B: "A times A⁻¹ equals the identity matrix",
        C: "A⁻¹ always equals A",
        D: "A has a determinant of zero"
      },
      correctAns: "B"
    },
    {
      question: "A set of vectors is linearly independent if:",
      options: {
        A: "One vector can be written as a combination of the others",
        B: "None of the vectors is the zero vector",
        C: "No vector in the set can be written as a linear combination of the others",
        D: "The vectors are all unit vectors"
      },
      correctAns: "C"
    },
    {
      question: "The dimension of a vector space is:",
      options: {
        A: "The number of vectors in any basis of that space",
        B: "The largest value found in any vector",
        C: "The number of zero vectors it contains",
        D: "Always equal to 3"
      },
      correctAns: "A"
    },
    {
      question: "An eigenvector of a matrix A is a non-zero vector v such that:",
      options: {
        A: "Av = 0",
        B: "Av = v + 1",
        C: "Av = λv, for some scalar λ",
        D: "vA = A"
      },
      correctAns: "C"
    },
    {
      question: "Which of these best describes what a linear transformation does to vectors?",
      options: {
        A: "It randomly reshuffles vector components",
        B: "It maps vectors to new vectors while preserving vector addition and scalar multiplication",
        C: "It converts vectors into scalars only",
        D: "It only works on 2D vectors"
      },
      correctAns: "B"
    }
  ]
};
