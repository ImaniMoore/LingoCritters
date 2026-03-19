"use client";

import Link from "next/link";

export default function ChildDashboard() {

    // placeholder user data — will come from your database later
    const user = {
        name: "Mia",
        stars: {
            reading: 6,
            writing: 3,
            speaking: 9,
        },
        completedLessons: 5,
        lastLesson: "/learn/speaking",
    };

    // critter buddy logic — picks animal based on most stars
    function getCritterBuddy() {
        const { reading, writing, speaking } = user.stars;
        if (speaking >= reading && speaking >= writing) return { name: "Pico", emoji: "🦜" };
        if (reading >= writing) return { name: "Ollie", emoji: "🦉" };
        return { name: "Teo", emoji: "🐢" };
    }

    const buddy = getCritterBuddy();
    const totalStars = user.stars.reading + user.stars.writing + user.stars.speaking;

    return (
        <div>

            {/* Welcome */}
            <section>
                <h1>Welcome back, {user.name}!</h1>
                <p>Keep up the great work!</p>
            </section>

            {/* Critter Buddy */}
            <section>
                <h2>Your Critter Buddy</h2>
                <span>{buddy.emoji}</span>
                <p>{buddy.name}</p>
                <p>Your strongest subject critter!</p>
            </section>

            {/* Stars Summary */}
            <section>
                <h2>Your Stars</h2>
                <div>
                    <div>
                        <p>Total Stars</p>
                        <p>⭐ {totalStars}</p>
                    </div>
                    <div>
                        <p>Lessons Completed</p>
                        <p>{user.completedLessons}</p>
                    </div>
                </div>
            </section>

            {/* Progress Per Subject */}
            <section>
                <h2>Your Progress</h2>
                <div>
                    <div>
                        <span>🦉</span>
                        <p>Reading with Ollie</p>
                        <p>⭐ {user.stars.reading} stars</p>
                    </div>
                    <div>
                        <span>🐢</span>
                        <p>Writing with Teo</p>
                        <p>⭐ {user.stars.writing} stars</p>
                    </div>
                    <div>
                        <span>🦜</span>
                        <p>Speaking with Pico</p>
                        <p>⭐ {user.stars.speaking} stars</p>
                    </div>
                </div>
            </section>

            {/* Continue Learning */}
            <section>
                <h2>Ready to learn?</h2>
                <Link href={user.lastLesson}>Continue Learning</Link>
                <Link href="/learn">Start a New Lesson</Link>
            </section>

        </div>
    );
}