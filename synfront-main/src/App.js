import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LearnCpp from "./pages/LearnCpp.js";
import LearnJava from "./pages/LearnJava.js";
import LearnJs from "./pages/LearnJavaScript.js";
import LearnPython from "./pages/Learnpython.js";
import LearnPhp from "./pages/LearnPhp.js";
import LearnSql from "./pages/LearnSql.js";
import Mern from "./components/PaidCourses/Mern.js";
import Dsa from "./components/PaidCourses/Dsa.js";
import MiddleSection from "./components/MiddleSection.js";
import Notes from "./components/PaidCourses/Notes/NotesSection.js";
import Login from "./components/LoginPage/Login.js";
import Signup from "./components/LoginPage/Signup.js";
import Cart from "./pages/Cart.js";
import chillGuyImage from './chillguy.jpg';
import Blogs from './pages/Blogs.js';
import Contact from './pages/Contact.js';
import AdminDashboard from './components/Admin/Dashboard.js';
import { AuthProvider, useAuth } from "./context/AuthContext.js";
import AdminLogin from "./components/LoginPage/AdminLogin.js";
import Testimonials from './components/Testimonials.js';
import Footer from './components/Footer.js';
import DSASheets from './pages/DSASheets.js';
import Chatbot from './pages/Chatbot.js';




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
        <Link to="/chatbot" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>Chatbot</Link>
        <Link to="/contact" style={{ margin: "0 20px", color: "black", textDecoration: "none", fontSize: "18px" }}>Contact us</Link>
      </div>

      {/* User Info/Buttons */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {user && user.username ? (
          <>
            <span style={{ marginRight: '20px', color: 'orange', fontWeight: 'bold' }}>
              Welcome, {user.username}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{ backgroundColor: "orange", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", fontSize: "16px" }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "orange", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", marginRight: "10px", fontSize: "16px" }}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "white", color: "orange", padding: "10px 20px", border: "2px solid orange", borderRadius: "5px", fontSize: "16px" }}
              >
                Sign Up
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ textAlign: "center", padding: "20px 20px" }}
    >
      <motion.div
        className="summary-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start", // Changed to flex-start to push content to left
          backgroundImage: `url(${chillGuyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          padding: "50px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          height: "600px",
          minHeight: "100%",
        }}
      >
        <div style={{
          textAlign: "left", // Changed to left alignment
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          paddingLeft: "50px", // Added left padding for spacing
          maxWidth: "50%", // Limit width to left side
        }}>
          <motion.h1
            style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to Syntaxशिक्षा
          </motion.h1>
          <motion.p
            style={{ fontSize: "1.2rem", marginTop: "20px", margin: "20px 0" }} // Changed margin to push left
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Welcome to SyntaxShiksha, where learning to code is as chill as the chill guy himself.<br></br>
            Learn programming the easy and fun way, with explanations in both English and Hinglish!

            <h3> Code Kar . Compile Kar. Chill Kar.</h3>
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        className="learn-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{ marginTop: "30px", padding: "0 40px" }}
      >
        <motion.h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "40px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Learn to Code
        </motion.h1>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
          marginTop: "30px"
        }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "450px",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#333" }}>C++</h2>
              <span style={{ fontSize: "2.5rem" }}>🔵</span>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              height: "200px",
              overflow: "auto"
            }}>
              <pre style={{ margin: 0 }}>
                {`#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}`}
              </pre>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px"
            }}>
              <Link to="/learn-cpp" style={{ width: "100%" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#0066cc",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Learn C++
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "450px",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#333" }}>Java</h2>
              <span style={{ fontSize: "2.5rem" }}>☕</span>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              height: "200px",
              overflow: "auto"
            }}>
              <pre style={{ margin: 0 }}>
                {`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`}
              </pre>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px"
            }}>
              <Link to="/learn-java" style={{ width: "100%" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#f89820",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Learn Java
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "450px",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#333" }}>JavaScript</h2>
              <span style={{ fontSize: "2.5rem" }}>💛</span>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              height: "200px",
              overflow: "auto"
            }}>
              <pre style={{ margin: 0 }}>
                {`function greet() {
    console.log("Hello World!");
}

greet();`}
              </pre>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px"
            }}>
              <Link to="/learn-js" style={{ width: "100%" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#f7df1e",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Learn JavaScript
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "450px",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#333" }}>Python</h2>
              <span style={{ fontSize: "2.5rem" }}>🐍</span>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              height: "200px",
              overflow: "auto"
            }}>
              <pre style={{ margin: 0 }}>
                {`def greet():
    print("Hello World!")

greet()`}
              </pre>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px"
            }}>
              <Link to="/learn-python" style={{ width: "100%" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#306998",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Learn Python
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "450px",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#333" }}>PHP</h2>
              <span style={{ fontSize: "2.5rem" }}>🐘</span>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              height: "200px",
              overflow: "auto"
            }}>
              <pre style={{ margin: 0 }}>
                {`<?php
function greet() {
    echo "Hello World!";
}
greet();
?>`}
              </pre>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px"
            }}>
              <Link to="/learn-php" style={{ width: "100%" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#777bb3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Learn PHP
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "450px",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2.5rem", color: "#333" }}>SQL</h2>
              <span style={{ fontSize: "2.5rem" }}>🗄️</span>
            </div>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              height: "200px",
              overflow: "auto"
            }}>
              <pre style={{ margin: 0 }}>
                {`SELECT * FROM users
WHERE name = 'John'
ORDER BY id DESC;`}
              </pre>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px"
            }}>
              <Link to="/learn-sql" style={{ width: "100%" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#e48e00",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Learn SQL
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <MiddleSection />

      <Testimonials />
      <Footer />
    </motion.div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/learn-cpp" element={<LearnCpp />} />
          <Route path="/learn-java" element={<LearnJava />} />
          <Route path="/learn-js" element={<LearnJs />} />
          <Route path="/learn-python" element={<LearnPython />} />
          <Route path="/learn-php" element={<LearnPhp />} />
          <Route path="/learn-sql" element={<LearnSql />} />
          <Route path="/learn-mern" element={<Mern />} />
          <Route path="/learn-dsa" element={<Dsa />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          <Route path="/dsa-sheets" element={<DSASheets />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;