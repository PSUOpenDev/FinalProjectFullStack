import { getGoogleUserName, GoogleCheck } from "../components/Common/Firebase";
import { returnFromServer } from "../lib/utils";
import { addDoc, updateDoc, deleteDoc, getDoc, setDoc } from "../lib/dbutils";
import { useEffect, useState } from "react";

export default function Home({ dataInput }) {
    const isSignIn = GoogleCheck();

    const [user, setUser] = useState({});

    useEffect(() => {
        if (isSignIn) {
            getDoc("users", { userName: getGoogleUserName() })
                .then((response) => response.json())
                .then(async (res) => {
                    const { data, success } = res;
                    console.log("==>", data);
                    if (success && data.length == 0) {
                        console.log("No data! Add doc");
                        const save = {
                            userName: getGoogleUserName(),
                            logInCount: 0,
                        };

                        setUser(save);
                        await addDoc("users", save);
                    } else {
                        if (data[0].logInCount > 5) {
                            setUser({});

                            await deleteDoc("users", {
                                userName: getGoogleUserName(),
                            });
                        } else {
                            data[0].logInCount++;
                            setUser(data[0]);

                            await setDoc("users", data[0]);
                        }
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [isSignIn]);
    return (
        <div>
            <div>
                Welcome{" "}
                {isSignIn ? getGoogleUserName() + " - " + user.logInCount : ""}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    let response = await getDoc("users", {});
    let res = await response.json();
    return returnFromServer(res);
}
