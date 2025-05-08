import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// TopBar component from App.js
const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", color: "orange", fontWeight: "bold", fontSize: "30px" }}>
        &lt;/&gt; SyntaxShiksha.in
      </div>

      {/* Navigation Links */}
      <div>
        <Link to="/" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>Home</Link>
        <Link to="/notes" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>Notes</Link>
        <Link to="/dsa-sheets" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>DSA Sheets</Link>
        <Link to="/blogs" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>Blogs</Link>
        <Link to="/contact" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>Contact</Link>
        <Link to="/about" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>About</Link>
      </div>

      {/* User Authentication */}
      <div>
        {user ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "20px", color: "black" }}>Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              style={{
                backgroundColor: "orange",
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                marginRight: "10px",
                fontSize: "16px"
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                backgroundColor: "white",
                color: "orange",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid orange",
                fontSize: "16px"
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const LearnJava = () => {
    const [selectedTopic, setSelectedTopic] = useState("setup");
    const [isBroMode, setIsBroMode] = useState(false);
    const [content, setContent] = useState("");
    const [styles, setStyles] = useState("");

    const loadContent = useCallback(async () => {
        try {
            const filePath = `${process.env.PUBLIC_URL}/content/java/${selectedTopic}_${isBroMode ? "bro" : "normal"}.html`;

            console.log("Fetching content from:", filePath);
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();

            // Extract the styles from the HTML
            const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
            if (styleMatch) {
                setStyles(styleMatch[1]);
            }

            // Extract the body content from the HTML
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            if (bodyMatch) {
                setContent(bodyMatch[1]);
            } else {
                setContent("<p>Content not properly formatted</p>");
            }
        } catch (error) {
            console.error("Error loading content:", error);
            setContent("<p>Content not available. Error: " + error.message + "</p>");
        }
    }, [selectedTopic, isBroMode]);

    useEffect(() => {
        loadContent();
    }, [loadContent]);

    const topics = {
        setup: (
            <div>
                <h2>Setting Up Your Environment</h2>
                <p>To start writing Java code, you need to set up your development environment. Here are the tools you need:</p>
                <ul>
                    <li>Visual Studio Code with the Java extension.</li>
                    <li>JDK (Java Development Kit) for compiling and running Java code.</li>
                </ul>
                <p>Once your environment is set up, you can write your first Java program:</p>
                <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                    <code>
                        {`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
                    </code>
                </pre>
                <p>This program outputs "Hello, World!" to the console. The `public class Main` defines a class, and the `main` method is the entry point of the program.</p>
            </div>
        ),
        syntax: (
            <div>
                <h2>Basic Syntax and Structure</h2>
                <p>Content for Basic Syntax and Structure...</p>
            </div>
        ),
        dataTypes: (
            <div>
                <h2>Data Types and Variables</h2>
                <p>Content for Data Types and Variables...</p>
            </div>
        ),
        controlFlow: (
            <div>
                <h2>Control Flow (if, for, while)</h2>
                <p>Content for Control Flow...</p>
            </div>
        ),
        functions: (
            <div>
                <h2>Methods</h2>
                <p>Content for Methods...</p>
            </div>
        ),
        oop: (
            <div>
                <h2>Object-Oriented Programming</h2>
                <p>Content for Object-Oriented Programming...</p>
            </div>
        ),
        collections: (
            <div>
                <h2>Collections Framework</h2>
                <p>Content for Collections Framework...</p>
            </div>
        ),
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden",
                    position: "fixed",
                    top: 0,
                    left: 0
                }}
            >
                {/* Top Navbar */}
                <TopBar />
                <div style={{
                    width: "100%",
                    backgroundColor: "#FF8C00",
                    padding: "15px 40px 15px 30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    boxSizing: "border-box"
                }}>
                    <h2 style={{
                        margin: 0,
                        color: "#ffffff",
                        fontSize: "24px",
                        fontWeight: "600"
                    }}>Learn Java</h2>
                </div>

                {/* Main Content Container */}
                <div style={{
                    display: "flex",
                    flex: 1,
                    overflow: "hidden"
                }}>
                    {/* Left Sidebar */}
                    <div style={{
                        width: "300px",
                        height: "100%",
                        padding: "30px 25px",
                        borderRight: "1px solid #eaeaea",
                        backgroundColor: "#ffffff",
                        boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
                        overflowY: "auto"
                    }}>
                        <h3 style={{
                            marginBottom: "30px",
                            color: "#333",
                            fontSize: "24px",
                            fontWeight: "600"
                        }}>Topics</h3>
                        <ul style={{ listStyleType: "none", padding: 0, marginBottom: "40px" }}>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("setup")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "setup" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "setup" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "setup" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Setting Up Your Environment
                                </motion.button>
                            </li>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("syntax")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "syntax" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "syntax" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "syntax" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Basic Syntax and Structure
                                </motion.button>
                            </li>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("dataTypes")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "dataTypes" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "dataTypes" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "dataTypes" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Data Types and Variables
                                </motion.button>
                            </li>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("controlFlow")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "controlFlow" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "controlFlow" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "controlFlow" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Control Flow (if, for, while)
                                </motion.button>
                            </li>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("functions")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "functions" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "functions" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "functions" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Methods
                                </motion.button>
                            </li>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("oop")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "oop" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "oop" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "oop" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Object-Oriented Programming
                                </motion.button>
                            </li>
                            <li style={{ margin: "15px 0" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTopic("collections")}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: selectedTopic === "collections" ? "#FF8C00" : "#ffffff",
                                        color: selectedTopic === "collections" ? "#ffffff" : "#333",
                                        border: `1px solid ${selectedTopic === "collections" ? "#FF8C00" : "#eaeaea"}`,
                                    }}
                                >
                                    Collections Framework
                                </motion.button>
                            </li>
                        </ul>
                    </div>

                    {/* Main Content Area */}
                    <div style={{
                        flex: 1,
                        height: "100%",
                        position: "relative",
                        backgroundColor: "#ffffff"
                    }}>
                        {/* BRO MODE Toggle Button */}
                        <div style={{
                            position: "sticky",
                            top: 0,
                            padding: "25px 40px",
                            backgroundColor: "#ffffff",
                            borderBottom: "1px solid #eaeaea",
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsBroMode(!isBroMode)}
                                style={{
                                    background: isBroMode ? "#FF8C00" : "#ffffff",
                                    border: `1px solid ${isBroMode ? "#FF8C00" : "#eaeaea"}`,
                                    color: isBroMode ? "#ffffff" : "#333",
                                    padding: "12px 25px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                                }}
                            >
                                {isBroMode ? "NORMAL MODE" : "BRO MODE 🔥"}
                            </motion.button>
                        </div>

                        {/* Scrollable Content Area */}
                        <motion.div
                            key={isBroMode ? 'bro' : 'normal'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                height: "calc(100% - 85px)",
                                overflowY: "auto",
                                padding: "40px"
                            }}
                        >
                            {/* Apply the extracted styles */}
                            <style>{styles}</style>
                            {/* Render the content */}
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const buttonStyle = {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "left",
    transition: "all 0.2s ease",
};

export default LearnJava;
