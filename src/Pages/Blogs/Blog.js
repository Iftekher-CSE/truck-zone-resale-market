import React from "react";

const Blog = () => {
    return (
        <div className="my-10">
            <h2 className="text-center text-3xl font-bold m-4">Get answered of some topic (Blog)</h2>

            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-8">
                <div className="collapse-title text-xl font-medium">
                    What are the different ways to manage a state in a React application?
                </div>
                <div className="collapse-content">
                    <p>
                        There are four main types of state one need to manage React apps
                        <br />
                        Local state: Local state is data we manage in one or another component. Local state is most
                        often managed in React using the useState hook.
                        <br />
                        Global state:Global state is data we manage across multiple components. Global state is
                        necessary when we want to get and update data anywhere in our app, or in multiple components at
                        least.
                        <br />
                        Server state: Data that comes from an external server that must be integrated with our UI state.
                        Server state is a simple concept, but can be hard to manage alongside all of our local and
                        global UI state.
                        <br />
                        URL state: Data that exists on our URLs, including the pathname and query parameters.
                    </p>
                </div>
            </div>

            <div tabIndex={1} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-8">
                <div className="collapse-title text-xl font-medium">How does prototypical inheritance work?</div>
                <div className="collapse-content">
                    <p>
                        Unlike object-oriented languages that use a class-based inheritance mechanism, JavaScript’s
                        inheritance system is prototypal. This post will show you how to achieve inheritance in
                        JavaScript through the concept of objects being able to inherit properties from other objects.{" "}
                        <br /> The core idea of Prototypal Inheritance is that an object can point to another object and
                        inherit all its properties. The main purpose is to allow multiple instances of an object to
                        share common properties, hence, the Singleton Pattern.
                    </p>
                </div>
            </div>

            <div tabIndex={2} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-8">
                <div className="collapse-title text-xl font-medium">
                    What is a unit test? Why should we write unit tests?
                </div>
                <div className="collapse-content">
                    <p>
                        <strong>Unit Test:</strong> Unit testing is a software development process in which the smallest
                        testable parts of an application, called units, are individually and independently scrutinized
                        for proper operation. This testing methodology is done during the development process by the
                        software developers and sometimes QA staff.
                        <br />
                        <strong>Why should we write unit tests: </strong>
                        The main objective of unit testing is to isolate written code to test and determine if it works
                        as intended. Unit testing is an important step in the development process, because if done
                        correctly, it can help detect early flaws in code which may be more difficult to find in later
                        testing stages.
                    </p>
                </div>
            </div>
            <div tabIndex={3} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-8">
                <div className="collapse-title text-xl font-medium">React vs. Angular vs. Vue?</div>
                <div className="collapse-content">
                    <p>
                        <strong>Angular </strong> is a front-end framework with lots of components, services, and tools.
                        On Angular’s site, you can see that they define Angular as: “The modern web developer’s
                        platform” It is developed and maintained by Google developers, but curiously it is not used to
                        implement any of their most common products such as Search or YouTube.
                        <br />
                        <strong>React </strong> is considered a UI library. They define themselves as: “A JavaScript
                        library for building user interfaces” Facebook developers are behind the development and
                        maintenance of this library. And, in this case, most of Facebook’s products are made with React.
                        <br />
                        Last but not least, <strong>Vue.js</strong> is, according to its site: “A progressive JavaScript
                        framework” Vue.js is developed and led by Evan You, but also it counts on a huge open-source
                        community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
