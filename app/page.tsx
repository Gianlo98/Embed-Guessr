'use client'

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Avatar} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {motion, AnimatePresence} from "framer-motion";
import React, {useState} from "react";
import md5 from "md5";

export default function Home() {
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setShowAvatar(false);
    };

    const playGame = () => {
        if (!checkEmail()) {
            setEmailInvalid(true);
            return;
        }

        setEmailInvalid(false);
        setShowAvatar(true);
    };

    const checkEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }


    const getFirstName = () => {
        if (!email) {
            return "";
        }

        const splittedEmail = email.split('.');
        if (splittedEmail.length < 2) {
            return "ff";
        }

        return (splittedEmail[0] as string).charAt(0).toUpperCase() + (splittedEmail[0] as string).slice(1);
    }

    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?s=2048&d=robohash`;

    return (
        <main className="flex items-center justify-center h-screen">
            <AnimatePresence>
                <motion.div layout
                            key="avatar"
                            initial={{scale: 0}}
                            animate={{rotate: 360, scale: 1}}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                >
                    <Card className="max-w-[600px]">
                        {showAvatar ?
                            <>

                                <CardHeader className="flex gap-3">
                                    <span className="subpixel-antialiased text-xl font-black">Welcome {getFirstName()}</span>
                                </CardHeader>
                                <CardBody className={"flex items-center"}>
                                    <Avatar src={gravatarUrl} size="lg" name={email}/>
                                </CardBody>
                                <CardFooter >
                                    <div className="w-full">
                                    <Button color="primary" onClick={() => setShowAvatar(false)} className={"w-full blo"}>Start guessing</Button>

                                    <span style={{marginTop: 15, fontSize: 7, textAlign: "center"}} className={"block underline text-right"}>Playing as {email}</span>

                                    </div>

                                </CardFooter>


                            </> :
                            <>
                                <CardHeader className="flex gap-3">
                                    <span className="subpixel-antialiased text-xl font-black">Embed Guessr</span>
                                </CardHeader>
                                <CardBody>
                                    <Input
                                        type="email"
                                        variant="bordered"
                                        label="Email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        isInvalid={emailInvalid}
                                        errorMessage={emailInvalid ? "Please enter a valid email" : ""}
                                        style={{width: "600px"}}
                                    />
                                    <Button color="primary" className="mt-2" onClick={playGame}>
                                        Login
                                    </Button>
                                </CardBody>
                                <Divider/>
                                <CardFooter className="flex justify-end">
                                    <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
                                        <Image src="/github-mark-white.png" alt="GitHub Repo" width={20} height={20}/>
                                    </Link>
                                </CardFooter>

                            </>
                        }
                    </Card>
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
