import { useState } from "react";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import "./App.css";

export const App = () => {
    const [members, setMembers] = useState<string[]>([]);
    const [whites, setWhites] = useState<string[]>([]);
    const [blacks, setBlacks] = useState<string[]>([]);

    const buildTeams = () => {
        const participants = [...members];
        for (let count = 0; count < 420; count++) {
            for (let i = participants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [participants[i], participants[j]] = [participants[j], participants[i]];
            }
        }
        const whitesFirst = Math.random() < 0.5;
        const newWhites: string[] = [];
        const newBlacks: string[] = [];
        for (let i = 0; i < participants.length; i++) {
            if (whitesFirst) {
                if (i % 2 === 0) newWhites.push(participants[i]);
                else newBlacks.push(participants[i]);
            } else {
                if (i % 2 === 0) newBlacks.push(participants[i]);
                else newWhites.push(participants[i]);
            }
        }
        setWhites(newWhites);
        setBlacks(newBlacks);
    };

    return (
        <div className="container">
            <h1>&#9917; Terminator &#9917;</h1>
            <Chips
                value={members}
                onChange={(e) => setMembers(e.value)}
                separator=","
                placeholder="Enter participant's name then press enter"
            />
            <Button label="Build teams" disabled={members.length < 2} onClick={buildTeams} />
            {whites.length > 0 && blacks.length > 0 && (
                <div className="results">
                    <section>
                        <h2>&#9898; Whites &#9898;</h2>
                        <ul>
                            {whites.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2>&#9899; Blacks &#9899;</h2>
                        <ul>
                            {blacks.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            )}
        </div>
    );
};
