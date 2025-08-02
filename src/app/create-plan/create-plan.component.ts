import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CreatePlanService } from '../services/create-plan.service';
import { CommonModule } from '@angular/common';
import { GoStudyPlanGapFourDays, GoStudyPlanGapWeek, GoStudyPlanWeekGapOne } from '../Models/weeks';


// interface dailyBreakForGapOne {
//   day: string;
//   description:string[]
//   whyToLearn:string[]
//   revision: string
// }

// interface weeklyBrdeakdownGapOne {
//   dayRange: string;
//   topic: string;
//   resources:string[];
//   activities:string[];
//   dailyBreakdown: dailyBreakForGapOne[]

// }
//  export interface GoStudyPlanWeekGapOne {
//   title: string;
//   introduction: string;
//   overallStrategy: string;
//   weeklyBreakdown: weeklyBrdeakdownGapOne[];  
//   forNextTopic: string;
//   finalReview: string;
//   motivationMessage: string;
// }
const FutureTime = 60 * 60 * 1000;   //first 60 for minutes,- seconds -miniseconds-no of hours

@Component({
  selector: 'app-create-plan',
  //In standalone Angular components, not using NgModule
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent implements OnInit {
  result = 0;
  isLoggedIn: boolean = false
  planPage = {
    subject: '',
    topic: '',
    days: '',
    hours: '',
  }
  weekNumber: number = 0
  getPlan: boolean = true;
  isGenerated: boolean = false;
  getPlanCount: number = 0;
  weekCount: number = 0;
  daysEnteredByUser: number = 1;

  constructor(private createPlan: CreatePlanService) { }

  studyPlanData: GoStudyPlanWeekGapOne | null = null
  // studyPlanData: GoStudyPlanWeekGapOne | GoStudyPlanGapFourDays | GoStudyPlanGapWeek | null = null

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token != null) {
      // localStorage.removeItem('token')
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }
    const storedPlan = localStorage.getItem("userPlanbeforeSave")
    if (storedPlan) {
      try {

        this.studyPlanData = JSON.parse(storedPlan) as GoStudyPlanWeekGapOne
      } catch (e) {
        console.log("error in getting", e)
      }
    }

    console.log("count->", this.getPlanCount)

  }



  GetPlanBtn(): void {
    const subject = document.getElementById('subject') as HTMLInputElement
    const topic = document.getElementById('topic') as HTMLInputElement
    const days = document.getElementById('days') as HTMLInputElement
    const hours = document.getElementById('hours') as HTMLInputElement
    const GetPlan = document.getElementById('GetPlan') as HTMLInputElement
    // var ResponseData: null
    this.getPlanCount = this.getPlanCount + 1;

    this.daysEnteredByUser = Number(days.value);
    if (this.getPlanCount > 20) {
      let nowTime = Date.now();
      localStorage.setItem("NowTime", JSON.stringify(nowTime))
      alert("extended limit! You can generate 5 Plan try again after 1 Hour")
      setTimeout(() => {
        this.getPlanCount = 0
        this.getPlan = true
        this.isGenerated = false
      }, FutureTime)
      //need to do this for a day
    }

    console.log("count->", this.getPlanCount)

    console.log("input from user", subject.value, topic.value, days.value)
    this.planPage.subject = subject.value
    this.planPage.topic = topic.value
    this.planPage.days = days.value
    this.planPage.hours = hours.value
    if ((this.planPage.subject || this.planPage.topic || this.planPage.days || this.planPage.hours) == "") {
      alert("Enter values")
      return
    }
    console.log("--", this.planPage.subject, this.planPage.days, this.planPage.hours)
    this.getPlan = false
    this.isGenerated = true;
    this.createPlan.GetPlan(this.planPage).subscribe({
      next: (response) => {
        let tt;
        if(this.daysEnteredByUser<=45){
          this.studyPlanData = response as GoStudyPlanWeekGapOne
          // this.studyPlanData.weeklyBreakdown1
          const a = this.studyPlanData.weeklyBreakdown;
          this.weekCount = a.length
          tt = this.studyPlanData.title
        }
        else if(this.daysEnteredByUser >45 && this.daysEnteredByUser <100){
          // this.studyPlanData=response as GoStudyPlanGapFourDays;
        }
        else{
          // this.studyPlanData=response as GoStudyPlanGapWeek;
        }
        console.log(this.weekCount)
        console.log("plan response->1st", response)
        console.log("plan response->2nd", this.studyPlanData)
        localStorage.setItem("userPlanbeforeSave", JSON.stringify(this.studyPlanData))
        localStorage.setItem("weekCount", JSON.stringify(this.weekCount))
        // let tt = this.studyPlanData.title
        console.log(tt)
        localStorage.setItem("title", JSON.stringify(tt))
      },
      error: (error) => {
        console.log("get plan error->x", error)
      }




    })
    // this.getPlanCount +=1
    // this.getPlan=false;
    // console.log("btn is now diabled")
    // GetPlan.style.opacity= "2";
    // GetPlan.style.backgroundColor="lightblue";
    // GetPlan.style.transformStyle="none"
    // GetPlan.style.cursor="none"
    // if(this.getPlanCount>1){
    //   alert("Please save OR clear the Plan ")

    // }

  }
  ClearPlan(): void {
    // alert("do you want to delete plan")
    // localStorage.removeItem("userPlan")
    const GetPlan = document.getElementById('GetPlan') as HTMLInputElement
    const workFlowDiv = document.getElementById('workFlowOutsideDiv') as HTMLInputElement
    workFlowDiv.innerHTML = ""
    // GetPlan.style.backgroundColor="blue";
    // GetPlan.style.color="white"
    // GetPlan.style.transformStyle="none"
    // GetPlan.style.cursor="pointer"
    this.getPlan = true;


    console.log(this.getPlan)
    this.isGenerated = false;
    localStorage.removeItem("userPlan2")
    localStorage.removeItem("userPlanbeforeSave")
    //  localStorage.clear()
  }
  SavePlan(): void {
    // this.createPlan.SavePlanByUser()
    console.log("saved successfully")
    localStorage.setItem("userplan2", JSON.stringify(this.studyPlanData))
    this.createPlan.SavePlanByUser().subscribe({
      next: (response: GoStudyPlanWeekGapOne) => {
        console.log(response)
        localStorage.removeItem("userPlan2");

        const workFlowDiv = document.getElementById('workFlowOutsideDiv') as HTMLInputElement
        workFlowDiv.innerHTML = ""
      }


    })
    this.getPlan = true;


    console.log(this.getPlan)
    this.isGenerated = false;
    localStorage.removeItem("userPlan2")
    localStorage.removeItem("userPlanbeforeSave")


  }
  // constructor(private router: Router) {}

  // savePlan(){
  //   this.result=1;
  // }

  weeklyBreakdown = {
    "title": "Go Programming for Absolute Beginners (12 Days)",
    "introduction": "This study plan provides a structured approach to learning the fundamentals of Go programming in 12 days, dedicating 2 hours per day.  We will focus on depth rather than breadth, ensuring a strong foundational understanding.  Each day includes specific learning goals, resources, and activities designed for absolute beginners.  Consistent effort and daily revision are key to success.",
    "overallStrategy": "This plan focuses on building a solid foundation in Go. We'll start with the basics of setting up your environment and writing simple programs, then progress to understanding variables, data types, control structures, and functions. By the end, you'll be able to write basic Go programs and understand the fundamental building blocks of the language.",
    "weeklyBreakdown": [
      {
        "dayRange": "Days 1-3",
        "topic": "Setting up Go Environment and Basic Syntax",
        "resources": ["https://go.dev/doc/tutorial/getting-started", "https://go.dev/tour/welcome/1"],
        "activities": ["Install Go, write 'Hello, World!' program, understand basic program structure, comments, and package declaration."],
        "dailyBreakdown": [
          {
            "day": "Day 1",
            "description": ["Install Go on your system (Windows, macOS, or Linux). Verify installation by running `go version` in your terminal."],
            "whyToLearn": ["Essential for writing and running Go programs."],
            "revision": "Run `go version` again to confirm installation."
          },
          {
            "day": "Day 2",
            "description": ["Write your first Go program ('Hello, World!'). Understand the structure of a Go program (package declaration, `main` function, `fmt.Println`). Practice adding comments."],
            "whyToLearn": ["To understand the basic structure and syntax of a Go program."],
            "revision": "Re-run your 'Hello, World!' program. Try adding a comment to explain a part of the code."
          },
          {
            "day": "Day 3",
            "description": ["Understand variables in Go: declaration, types (int, float64, string, bool), and assignment. Practice using variables in simple programs. Experiment with different variable types."],
            "whyToLearn": ["Variables are fundamental to storing and manipulating data within your programs."],
            "revision": "Write a small program that uses variables of different types and prints their values."
          }
        ]
      },
      {
        "dayRange": "Days 4-7",
        "topic": "Data Types, Operators and Control Flow",
        "resources": ["https://go.dev/tour/basics/1", "https://go.dev/doc/effective_go#blank"],
        "activities": ["Explore Go's built-in data types, operators, and conditional statements. Work with loops and practice writing programs using these concepts."],
        "dailyBreakdown": [
          {
            "day": "Day 4",
            "description": ["Learn about different data types in Go (int, float, string, bool, arrays, slices). Practice declaring and initializing variables of these types."],
            "whyToLearn": ["To understand how to represent and manipulate different kinds of data."],
            "revision": "Write examples using various data types. What happens if you try to mix data types?"
          },
          {
            "day": "Day 5",
            "description": ["Understand arithmetic, comparison, and logical operators in Go. Practice using them in expressions and conditions."],
            "whyToLearn": ["Operators are the tools to perform calculations and comparisons in your programs."],
            "revision": "Create small programs involving arithmetic and logical operations, and test the results."
          },
          {
            "day": "Day 6",
            "description": ["Master conditional statements (if, else if, else) and practice writing programs with conditional logic."],
            "whyToLearn": ["To write programs that respond differently based on conditions."],
            "revision": "Write a program to check if a number is even or odd."
          },
          {
            "day": "Day 7",
            "description": ["Learn about loops (for loop). Practice writing programs that iterate over arrays, slices and ranges."],
            "whyToLearn": ["Loops allow you to repeat blocks of code."],
            "revision": "Write a program to print numbers 1 to 10 using a `for` loop."
          }
        ]
      },
      {
        "dayRange": "Days 8-11",
        "topic": "Functions and Packages",
        "resources": ["https://go.dev/tour/basics/4", "https://go.dev/pkg/fmt/"],
        "activities": ["Learn to define and use functions in Go.  Understand packages and how to use built-in packages such as `fmt` and `math`."],
        "dailyBreakdown": [
          {
            "day": "Day 8",
            "description": ["Learn the basics of functions in Go: function declaration, parameters, return values. Write simple functions that perform basic operations."],
            "whyToLearn": ["Functions allow to break down complex programs into smaller, reusable modules."],
            "revision": "Write a function to add two numbers, and another to calculate the average of two numbers."
          },
          {
            "day": "Day 9",
            "description": ["Understand the concept of packages in Go. Learn how to use the standard library's `fmt` package for input/output operations."],
            "whyToLearn": ["Packages are essential for code reusability and organization."],
            "revision": "Write a program that uses `fmt.Printf` to print formatted output."
          },
          {
            "day": "Day 10",
            "description": ["Explore more advanced features of functions, including multiple return values and variadic functions."],
            "whyToLearn": ["To write flexible and reusable functions."],
            "revision": "Write a function that returns both the sum and the difference of two numbers."

          },
          {
            "day": "Day 11",
            "description": ["Practice using the `math` package for mathematical operations. Explore other standard library packages as needed."],
            "whyToLearn": ["To leverage the power of pre-built functions for common tasks."],
            "revision": "Write a program that calculates the square root of a number using the `math` package."
          }
        ]
      },
      {
        "dayRange": "Day 12",
        "topic": "Review and Consolidation",
        "resources": [],
        "activities": ["Review all the concepts learned so far. Work on a small project to consolidate your knowledge."],
        "dailyBreakdown": [
          {
            "day": "Day 12",
            "description": ["Review all concepts from the previous days. Create a small program integrating multiple concepts (variables, control flow, functions)."],
            "whyToLearn": ["Consolidates learning and develops problem-solving skills."],
            "revision": "Debug your program thoroughly and try to make it more efficient."
          }
        ]
      }
    ],
    "forNextTopic": "If you have more time, I recommend focusing on data structures (arrays, slices, maps), more on standard libraries, and perhaps error handling.  Remember, focus is key! Let's master the fundamentals first.",
    "finalReview": "Go through all the examples you've written and make sure you understand each line of code. Try to modify them and experiment with different variations.",
    "motivationMessage": "Congratulations on completing this intensive Go programming course! You've built a strong foundation.  Remember, consistent practice is the key to mastering any programming language. Keep coding, keep exploring, and keep learning!"
  }





  //  weeklyBreakdown1:any[]= [
  //   {
  //     "dayRange": "Week 1",
  //     "topic": "Setting up your Go environment and Basic Syntax",
  //     "resources": ["https://go.dev/doc/install", "https://gobyexample.com/"],
  //     "activities": ["Install Go, Write your first 'Hello, World!' program", "Explore basic Go syntax (variables, data types, operators)"],
  //     "dailyBreakdown": [
  //       {
  //         "day": "Day 1",
  //         "description": ["Install Go on your system", "Understand the Go workspace and its structure"],
  //         "whyToLearn": ["To get started with Go programming. Essential to write any code"],
  //         "revision": "Write and run your first 'Hello, World!' program."
  //       },
  //       {
  //         "day": "Day 2",
  //         "description": ["Learn about variables (declaration, assignment, types)", "Explore data types (int, float, string, bool)"],
  //         "whyToLearn": ["Variables are the building blocks of any program. Data types are crucial for understanding how data is stored and manipulated."],
  //         "revision": "Practice declaring and using different types of variables."
  //       },
  //       {
  //         "day": "Day 3",
  //         "description": ["Operators (arithmetic, comparison, logical)", "Simple input/output (using fmt.Println, fmt.Scanln)"],
  //         "whyToLearn": ["Operators allow you to perform operations on data. I/O is needed for basic interactions."],
  //         "revision": "Write a program that takes user input and performs a calculation."
  //       },
  //       {
  //         "day": "Day 4",
  //         "description": ["Control flow statements: if-else", "Practice with simple conditional logic"],
  //         "whyToLearn": ["Essential for controlling the program's flow based on conditions."],
  //         "revision": "Create programs with if-else statements to solve problems"
  //       },
  //       {
  //         "day": "Day 5",
  //         "description": ["Control flow: for loops", "Practice using loops for iteration."],
  //         "whyToLearn": ["For loops are essential for repeating blocks of code."],
  //         "revision": "Write programs using for loops for different iterative tasks."
  //       },
  //       {
  //         "day": "Day 6",
  //         "description": ["Control flow: switch statements", "Compare with if-else"],
  //         "whyToLearn": ["Switch statements provide a more concise way to handle multiple conditions."],
  //         "revision": "Rewrite an if-else based program using switch for comparison."
  //       },
  //       {
  //         "day": "Day 7",
  //         "description": ["Arrays and Slices", "Understand the difference and when to use which"],
  //         "whyToLearn": ["Arrays and slices are fundamental for storing and managing collections of data."],
  //         "revision": "Practice creating and manipulating arrays and slices. "
  //       }
  //     ]
  //   },
  //   {
  //     "dayRange": "Week 2",
  //     "topic": "Functions, and Data Structures",
  //     "resources": ["https://go.dev/tour/welcome/1", "https://golang.org/doc/effective_go.html#functions"],
  //     "activities": ["Learn to define and call functions", "Understand maps and structs"],
  //     "dailyBreakdown": [
  //       {
  //         "day": "Day 8",
  //         "description": ["Functions: definition and calling", "Function parameters and return values"],
  //         "whyToLearn": ["Functions help to organize code into reusable blocks."],
  //         "revision": "Create several functions to perform different tasks."
  //       },
  //       {
  //         "day": "Day 9",
  //         "description": ["Function parameters: pass by value vs pass by reference", "Understanding pointers"],
  //         "whyToLearn": ["Understanding the different ways values are passed is critical for memory management"],
  //         "revision": "Write examples to demonstrate pass by value and pass by reference."
  //       },
  //       {
  //         "day": "Day 10",
  //         "description": ["Maps (key-value pairs)", "Iterating through maps"],
  //         "whyToLearn": ["Maps are essential for storing and accessing data efficiently."],
  //         "revision": "Implement a simple phone book using maps."
  //       },
  //       {
  //         "day": "Day 11",
  //         "description": ["Structs (custom data types)", "Defining and using structs"],
  //         "whyToLearn": ["Structs allow you to group related data together."],
  //         "revision": "Create a struct to represent a person, with fields like name, age, address."
  //       },
  //       {
  //         "day": "Day 12",
  //         "description": ["Methods on structs", "Implement simple methods"],
  //         "whyToLearn": ["Methods add behavior to your custom data types."],
  //         "revision": "Add methods to the 'person' struct for printing information."
  //       },
  //       {
  //         "day": "Day 13",
  //         "description": ["More on methods and its use cases", "Understanding receivers"],
  //         "whyToLearn": ["Advanced method usage, focusing on receivers"],
  //         "revision": "Implement complex methods with receivers"
  //       },
  //       {
  //         "day": "Day 14",
  //         "description": ["Review of functions, maps, and structs", "Practice combining them in a program"],
  //         "whyToLearn": ["Reinforce the understanding of these core concepts."],
  //         "revision": "Create a small project combining maps, structs, functions, and methods."
  //       }
  //     ]
  //   },
  //   {
  //     "dayRange": "Week 3",
  //     "topic": "Packages and Error Handling",
  //     "resources": ["https://go.dev/doc/effective_go#blank", "https://go.dev/blog/error-handling-and-go"],
  //     "activities": ["Understand how to use packages", "Learn to handle errors effectively"],
  //     "dailyBreakdown": [
  //       {
  //         "day": "Day 15",
  //         "description": ["Introduction to packages", "Using the `math` and `fmt` packages"],
  //         "whyToLearn": ["Packages allow you to reuse code and structure your projects."],
  //         "revision": "Write a program using functions from the `math` package."
  //       },
  //       {
  //         "day": "Day 16",
  //         "description": ["Creating your own packages", "Organizing your code"],
  //         "whyToLearn": ["Essential for managing larger projects."],
  //         "revision": "Create a simple package with reusable functions."
  //       },
  //       {
  //         "day": "Day 17",
  //         "description": ["Error handling: checking for errors", "Using `if err != nil`"],
  //         "whyToLearn": ["Crucial for writing robust and reliable programs."],
  //         "revision": "Write a program that gracefully handles file I/O errors."
  //       },
  //       {
  //         "day": "Day 18",
  //         "description": ["Error handling: custom error types", "Creating your own error types"],
  //         "whyToLearn": ["Allows for more informative error messages."],
  //         "revision": "Create a function that returns a custom error type."
  //       },
  //       {
  //         "day": "Day 19",
  //         "description": ["Error handling: error wrapping", "Using `fmt.Errorf`"],
  //         "whyToLearn": ["Provides context to errors"],
  //         "revision": "Implement error wrapping in file I/O operations."
  //       },
  //       {
  //         "day": "Day 20",
  //         "description": ["Review of packages and error handling", "Practice creating and handling errors"],
  //         "whyToLearn": ["Reinforce the learning of error handling"],
  //         "revision": "Build a simple project involving packages and error handling."
  //       },
  //       {
  //         "day": "Day 21",
  //         "description": ["Defer, Panic and Recover"],
  //         "whyToLearn": ["Essential for managing exceptional situations"],
  //         "revision": "Implement examples showing the usage of defer, panic, and recover."
  //       }
  //     ]
  //   },
  //   {
  //     "dayRange": "Week 4",
  //     "topic": "Concurrency and Goroutines",
  //     "resources": ["https://go.dev/tour/concurrency/1", "https://blog.golang.org/go-concurrency-patterns-2012"],
  //     "activities": ["Understand goroutines and channels", "Learn to write concurrent programs"],
  //     "dailyBreakdown": [
  //       {
  //         "day": "Day 22",
  //         "description": ["Introduction to goroutines", "Using `go` keyword"],
  //         "whyToLearn": ["Goroutines are lightweight concurrent functions."],
  //         "revision": "Write simple examples of goroutines."
  //       },
  //       {
  //         "day": "Day 23",
  //         "description": ["Channels: sending and receiving data", "Synchronization"],
  //         "whyToLearn": ["Channels allow communication between goroutines."],
  //         "revision": "Write a program that uses channels to send data between goroutines."
  //       },
  //       {
  //         "day": "Day 24",
  //         "description": ["Channel directions (unidirectional channels)", "Buffer channels"],
  //         "whyToLearn": ["Fine-grained control of communication between goroutines"],
  //         "revision": "Write a program using different types of channels."
  //       },
  //       {
  //         "day": "Day 25",
  //         "description": ["WaitGroup for synchronization", "Proper use of waitgroups"],
  //         "whyToLearn": ["WaitGroups are a critical tool for synchronizing goroutines."],
  //         "revision": "Create programs using waitgroups for better control of concurrent tasks."
  //       },
  //       {
  //         "day": "Day 26",
  //         "description": ["Select statements for multiplexing channels"],
  //         "whyToLearn": ["Select statements help in handling multiple channels concurrently."],
  //         "revision": "Write programs using select statements."
  //       },
  //       {
  //         "day": "Day 27",
  //         "description": ["Review of goroutines and channels", "Practice building a concurrent program"],
  //         "whyToLearn": ["Reinforce concepts and build experience"],
  //         "revision": "Build a slightly complex program utilizing goroutines and channels."
  //       },
  //       {
  //         "day": "Day 28",
  //         "description": ["Advanced concurrency patterns (optional, time permitting)"],
  //         "whyToLearn": ["Explore more sophisticated techniques"],
  //         "revision": "Try implementing some advanced concurrent patterns (if time allows)"
  //       }
  //     ]
  //   },
  //   {
  //     "dayRange": "Week 5",
  //     "topic": "Testing and Standard Libraries",
  //     "resources": ["https://go.dev/blog/testing", "https://golang.org/pkg/"],
  //     "activities": ["Learn to write unit tests", "Explore useful standard libraries"],
  //     "dailyBreakdown": [
  //       {
  //         "day": "Day 29",
  //         "description": ["Writing unit tests with `testing` package"],
  //         "whyToLearn": ["Testing is essential for writing reliable code."],
  //         "revision": "Write unit tests for functions created earlier."
  //       },
  //       {
  //         "day": "Day 30",
  //         "description": ["Exploring useful standard libraries (e.g., `net/http`, `os`, `io`)"],
  //         "whyToLearn": ["Standard libraries offer pre-built functionalities."],
  //         "revision": "Build a simple web server using the `net/http` package or explore file operations using `os` and `io`."
  //       }
  //     ]
  //   }
  // ]




}




//  {
//     "title": "Go Programming Language Learning Plan (66 Days)",
//     "introduction": "This 66-day study plan is designed to help you learn Go programming effectively, allocating 2 hours daily.  We'll cover fundamental concepts, progress to advanced topics, and incorporate hands-on practice to solidify your understanding.  Consistent effort and active engagement are crucial for success.",
//     "overallStrategy": "This plan employs a phased approach, starting with the basics and gradually building complexity. We’ll combine theoretical learning with practical coding exercises and mini-projects. Regular revision and consistent practice will be vital to retaining the information.",
//     "weeklyBreakdown": [
//         {
//             "weekRange": "Week 1-2 (Days 1-14)",
//             "topic": "Fundamentals: Setup, Syntax, Data Types, Control Flow",
//             "resources": [
//                 "A Tour of Go (https://go.dev/tour/welcome/1)",
//                 "Effective Go (https://go.dev/doc/effective_go)",
//                 "Go by Example (https://gobyexample.com/)",
//                 "Go Programming Blueprints (Book)"
//             ],
//             "activities": [
//                 "Install Go, set up your environment.",
//                 "Work through 'A Tour of Go'.",
//                 "Complete exercises from 'Go by Example'.",
//                 "Practice writing simple programs.",
//                 "Start building a small personal project (e.g., a simple command-line tool)."
//             ],
//             "dailyBreakdown": [
//                 {
//                     "day": "Day 1-3",
//                     "description": [
//                         "Setting up your Go environment. Explore basic syntax and data types."
//                     ],
//                     "revision": "Review basic syntax and data types."
//                 },
//                 {
//                     "day": "Day 4-7",
//                     "description": [
//                         "Complete 'A Tour of Go' sections on control flow. Implement basic control flow examples."
//                     ],
//                     "revision": "Practice different control flow structures (if, for, switch)."
//                 },
//                 {
//                     "day": "Day 8-14",
//                     "description": [
//                         "Work through selected exercises from 'Go by Example'. Build a small command-line application"
//                     ],
//                     "revision": "Review fundamental concepts. Improve your command-line application."
//                 }
//             ]
//         },
//         {
//             "weekRange": "Week 3-4 (Days 15-28)",
//             "topic": "Data Structures: Arrays, Slices, Maps",
//             "resources": [
//                 "Effective Go (https://go.dev/doc/effective_go)",
//                 "Go Data Structures and Algorithms (Book/Online resources)",
//                 "Online Tutorials on Data Structures in Go"
//             ],
//             "activities": [
//                 "Deep dive into arrays, slices, and maps.",
//                 "Implement different algorithms using arrays and slices (searching, sorting).",
//                 "Build a small program that utilizes different data structures (e.g., a simple inventory management system)."
//             ],
//             "dailyBreakdown": [
//                 {
//                     "day": "Day 15-18",
//                     "description": [
//                         "Learn about Arrays and Slices. Practice manipulating them."
//                     ],
//                     "revision": "Review array and slice operations"
//                 },
//                 {
//                     "day": "Day 19-21",
//                     "description": [
//                         "Learn about maps. Implement basic map operations."
//                     ],
//                     "revision": "Review map operations and practice using them"
//                 },
//                 {
//                     "day": "Day 22-28",
//                     "description": [
//                         "Build a small program that uses arrays, slices, and maps effectively."
//                     ],
//                     "revision": "Review all data structures. Refactor your program for efficiency"
//                 }
//             ]
//         },
//         {
//             "weekRange": "Week 5-6 (Days 29-42)",
//             "topic": "Functions, Methods, Interfaces, Concurrency",
//             "resources": [
//                 "Effective Go (https://go.dev/doc/effective_go)",
//                 "Go Concurrency Patterns (Book/Online resources)",
//                 "Understanding Go Concurrency (blog posts, tutorials)"
//             ],
//             "activities": [
//                 "Master function declarations, parameters, and return values.",
//                 "Understand methods and their applications.",
//                 "Learn about interfaces and polymorphism.",
//                 "Explore goroutines and channels for concurrent programming.",
//                 "Develop a small project utilizing concurrency (e.g., a simple web server)."
//             ],
//             "dailyBreakdown": [
//                 {
//                     "day": "Day 29-32",
//                     "description": [
//                         "Master functions, parameters, return values. Implement different functional approaches"
//                     ],
//                     "revision": "Review function design and best practices"
//                 },
//                 {
//                     "day": "Day 33-35",
//                     "description": [
//                         "Learn methods and implement them in different scenarios"
//                     ],
//                     "revision": "Review method design and best practices"
//                 },
//                 {
//                     "day": "Day 36-42",
//                     "description": [
//                         "Learn about Goroutines and channels. Start building a simple project that uses concurrency."
//                     ],
//                     "revision": "Review concurrency concepts. Refactor your project"
//                 }
//             ]
//         },
//         {
//             "weekRange": "Week 7-8 (Days 43-56)",
//             "topic": "Packages, Modules, Error Handling, Testing",
//             "resources": [
//                 "Effective Go (https://go.dev/doc/effective_go)",
//                 "Go Modules Reference (https://go.dev/ref/mod)",
//                 "Go Testing (https://go.dev/blog/testing)",
//                 "Common Go Errors and their solutions"
//             ],
//             "activities": [
//                 "Learn how to organize code into packages.",
//                 "Master Go modules for dependency management.",
//                 "Implement robust error handling techniques.",
//                 "Write unit tests for your code.",
//                 "Work on a more complex project integrating all learned concepts."
//             ],
//             "dailyBreakdown": [
//                 {
//                     "day": "Day 43-46",
//                     "description": [
//                         "Learn about Packages and Modules. Practice creating and using them"
//                     ],
//                     "revision": "Review package and module management"
//                 },
//                 {
//                     "day": "Day 47-49",
//                     "description": [
//                         "Implement error handling using different techniques"
//                     ],
//                     "revision": "Review error handling best practices"
//                 },
//                 {
//                     "day": "Day 50-56",
//                     "description": [
//                         "Learn how to write Unit tests and apply them to your previous projects"
//                     ],
//                     "revision": "Review testing concepts and practices"
//                 }
//             ]
//         },
//         {
//             "weekRange": "Week 9 (Days 57-63)",
//             "topic": "Advanced Topics (Choose 2-3 based on your interest): Web Development, Databases, Networking, or more complex data structures and algorithms",
//             "resources": [
//                 "Online Courses (Udemy, Coursera, etc.)",
//                 "Go Web Framework documentation (e.g., Gin, Echo, Fiber)",
//                 "Database drivers for Go (e.g., PostgreSQL, MySQL, MongoDB)",
//                 "Go standard library networking packages"
//             ],
//             "activities": [
//                 "Select advanced topics based on your interests and career goals.",
//                 "Follow tutorials and documentation to implement the chosen topic.",
//                 "Build a larger project demonstrating your understanding of the chosen topic."
//             ],
//             "dailyBreakdown": [
//                 {
//                     "day": "Day 57-63",
//                     "description": [
//                         "Study and implement two advanced topics of your choice. Build a significant project."
//                     ],
//                     "revision": "Review the chosen topics."
//                 }
//             ]
//         },
//         {
//             "weekRange": "Week 10 (Days 64-66)",
//             "topic": "Project Consolidation and Review",
//             "resources": [
//                 "Your own code",
//                 "Go documentation",
//                 "Online forums and communities"
//             ],
//             "activities": [
//                 "Consolidate all your projects into a portfolio.",
//                 "Refactor and optimize your code.",
//                 "Review all fundamental and advanced concepts.",
//                 "Prepare for interviews or further learning."
//             ],
//             "dailyBreakdown": [
//                 {
//                     "day": "Day 64-66",
//                     "description": [
//                         "Consolidate projects, refactor code, conduct a thorough review of all learned materials."
//                     ],
//                     "revision": "Final review of all concepts. Prepare for the next learning phase."
//                 }
//             ]
//         }
//     ],
//     "finalReview": "After completing the 66-day plan, dedicate time to revisiting challenging concepts and refining your coding skills. Practice consistently, contribute to open-source projects, and actively participate in the Go community to enhance your learning.",
//     "motivationMessage": "Learning Go takes dedication and effort, but the rewards are significant. With consistent work and a passion for programming, you can master this powerful language.  Embrace the challenge, celebrate your progress, and enjoy the journey!  You've got this!"
// }