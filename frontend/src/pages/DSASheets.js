import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DSASheets = () => {
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [expandedDifficulty, setExpandedDifficulty] = useState({});

    const dsaQuestions = [
        {
            id: 1,
            title: "Arrays",
            questions: {
                easy: [
                    { id: 1, title: "Two Sum", leetcode: "https://leetcode.com/problems/two-sum/" },
                    { id: 2, title: "Best Time to Buy and Sell Stock", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
                    { id: 3, title: "Plus One", leetcode: "https://leetcode.com/problems/plus-one/" },
                    { id: 4, title: "Remove Duplicates from Sorted Array", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
                    { id: 5, title: "Move Zeroes", leetcode: "https://leetcode.com/problems/move-zeroes/" }
                ],
                medium: [
                    { id: 1, title: "3Sum", leetcode: "https://leetcode.com/problems/3sum/" },
                    { id: 2, title: "Container With Most Water", leetcode: "https://leetcode.com/problems/container-with-most-water/" },
                    { id: 3, title: "Subarray Sum Equals K", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
                    { id: 4, title: "Product of Array Except Self", leetcode: "https://leetcode.com/problems/product-of-array-except-self/" },
                    { id: 5, title: "Find First and Last Position of Element in Sorted Array", leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" }
                ],
                hard: [
                    { id: 1, title: "First Missing Positive", leetcode: "https://leetcode.com/problems/first-missing-positive/" },
                    { id: 2, title: "Median of Two Sorted Arrays", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
                    { id: 3, title: "Maximum Gap", leetcode: "https://leetcode.com/problems/maximum-gap/" },
                    { id: 4, title: "Sliding Window Maximum", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
                    { id: 5, title: "Trapping Rain Water", leetcode: "https://leetcode.com/problems/trapping-rain-water/" }
                ]
            }
        },
        {
            id: 2,
            title: "Strings",
            questions: {
                easy: [
                    { id: 1, title: "Valid Palindrome", leetcode: "https://leetcode.com/problems/valid-palindrome/" },
                    { id: 2, title: "Valid Anagram", leetcode: "https://leetcode.com/problems/valid-anagram/" },
                    { id: 3, title: "Longest Common Prefix", leetcode: "https://leetcode.com/problems/longest-common-prefix/" },
                    { id: 4, title: "Implement strStr()", leetcode: "https://leetcode.com/problems/implement-strstr/" },
                    { id: 5, title: "Roman to Integer", leetcode: "https://leetcode.com/problems/roman-to-integer/" }
                ],
                medium: [
                    { id: 1, title: "Longest Substring Without Repeating Characters", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
                    { id: 2, title: "String to Integer (atoi)", leetcode: "https://leetcode.com/problems/string-to-integer-atoi/" },
                    { id: 3, title: "Generate Parentheses", leetcode: "https://leetcode.com/problems/generate-parentheses/" },
                    { id: 4, title: "Longest Palindromic Substring", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/" },
                    { id: 5, title: "Group Anagrams", leetcode: "https://leetcode.com/problems/group-anagrams/" }
                ],
                hard: [
                    { id: 1, title: "Regular Expression Matching", leetcode: "https://leetcode.com/problems/regular-expression-matching/" },
                    { id: 2, title: "Minimum Window Substring", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
                    { id: 3, title: "Valid Number", leetcode: "https://leetcode.com/problems/valid-number/" },
                    { id: 4, title: "Distinct Subsequences", leetcode: "https://leetcode.com/problems/distinct-subsequences/" },
                    { id: 5, title: "Word Break II", leetcode: "https://leetcode.com/problems/word-break-ii/" }
                ]
            }
        },
        {
            id: 3,
            title: "Linked Lists",
            questions: {
                easy: [
                    { id: 1, title: "Reverse Linked List", leetcode: "https://leetcode.com/problems/reverse-linked-list/" },
                    { id: 2, title: "Merge Two Sorted Lists", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/" },
                    { id: 3, title: "Linked List Cycle", leetcode: "https://leetcode.com/problems/linked-list-cycle/" },
                    { id: 4, title: "Palindrome Linked List", leetcode: "https://leetcode.com/problems/palindrome-linked-list/" },
                    { id: 5, title: "Remove Linked List Elements", leetcode: "https://leetcode.com/problems/remove-linked-list-elements/" }
                ],
                medium: [
                    { id: 1, title: "Add Two Numbers", leetcode: "https://leetcode.com/problems/add-two-numbers/" },
                    { id: 2, title: "Remove Nth Node From End of List", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
                    { id: 3, title: "Rotate List", leetcode: "https://leetcode.com/problems/rotate-list/" },
                    { id: 4, title: "Reorder List", leetcode: "https://leetcode.com/problems/reorder-list/" },
                    { id: 5, title: "Linked List Cycle II", leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/" }
                ],
                hard: [
                    { id: 1, title: "Merge k Sorted Lists", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
                    { id: 2, title: "Reverse Nodes in k-Group", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
                    { id: 3, title: "Copy List with Random Pointer", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
                    { id: 4, title: "LFU Cache", leetcode: "https://leetcode.com/problems/lfu-cache/" },
                    { id: 5, title: "Sort List", leetcode: "https://leetcode.com/problems/sort-list/" }
                ]
            }
        },
        {
            id: 4,
            title: "Trees",
            questions: {
                easy: [
                    { id: 1, title: "Maximum Depth of Binary Tree", leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
                    { id: 2, title: "Symmetric Tree", leetcode: "https://leetcode.com/problems/symmetric-tree/" },
                    { id: 3, title: "Path Sum", leetcode: "https://leetcode.com/problems/path-sum/" },
                    { id: 4, title: "Invert Binary Tree", leetcode: "https://leetcode.com/problems/invert-binary-tree/" },
                    { id: 5, title: "Subtree of Another Tree", leetcode: "https://leetcode.com/problems/subtree-of-another-tree/" }
                ],
                medium: [
                    { id: 1, title: "Binary Tree Level Order Traversal", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
                    { id: 2, title: "Construct Binary Tree from Preorder and Inorder Traversal", leetcode: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
                    { id: 3, title: "Validate Binary Search Tree", leetcode: "https://leetcode.com/problems/validate-binary-search-tree/" },
                    { id: 4, title: "Kth Smallest Element in a BST", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
                    { id: 5, title: "Lowest Common Ancestor of a Binary Tree", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" }
                ],
                hard: [
                    { id: 1, title: "Binary Tree Maximum Path Sum", leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
                    { id: 2, title: "Serialize and Deserialize Binary Tree", leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
                    { id: 3, title: "Recover Binary Search Tree", leetcode: "https://leetcode.com/problems/recover-binary-search-tree/" },
                    { id: 4, title: "Binary Tree Cameras", leetcode: "https://leetcode.com/problems/binary-tree-cameras/" },
                    { id: 5, title: "Vertical Order Traversal of a Binary Tree", leetcode: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" }
                ]
            }
        },
        {
            id: 5,
            title: "Dynamic Programming",
            questions: {
                easy: [
                    { id: 1, title: "Climbing Stairs", leetcode: "https://leetcode.com/problems/climbing-stairs/" },
                    { id: 2, title: "House Robber", leetcode: "https://leetcode.com/problems/house-robber/" },
                    { id: 3, title: "Maximum Subarray", leetcode: "https://leetcode.com/problems/maximum-subarray/" },
                    { id: 4, title: "Range Sum Query - Immutable", leetcode: "https://leetcode.com/problems/range-sum-query-immutable/" },
                    { id: 5, title: "Counting Bits", leetcode: "https://leetcode.com/problems/counting-bits/" }
                ],
                medium: [
                    { id: 1, title: "Coin Change", leetcode: "https://leetcode.com/problems/coin-change/" },
                    { id: 2, title: "Longest Increasing Subsequence", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/" },
                    { id: 3, title: "Unique Paths", leetcode: "https://leetcode.com/problems/unique-paths/" },
                    { id: 4, title: "Jump Game", leetcode: "https://leetcode.com/problems/jump-game/" },
                    { id: 5, title: "Target Sum", leetcode: "https://leetcode.com/problems/target-sum/" }
                ],
                hard: [
                    { id: 1, title: "Edit Distance", leetcode: "https://leetcode.com/problems/edit-distance/" },
                    { id: 2, title: "Burst Balloons", leetcode: "https://leetcode.com/problems/burst-balloons/" },
                    { id: 3, title: "Regular Expression Matching", leetcode: "https://leetcode.com/problems/regular-expression-matching/" },
                    { id: 4, title: "Longest Valid Parentheses", leetcode: "https://leetcode.com/problems/longest-valid-parentheses/" },
                    { id: 5, title: "Wildcard Matching", leetcode: "https://leetcode.com/problems/wildcard-matching/" }
                ]
            }
        },
        {
            id: 6,
            title: "Graphs",
            questions: {
                easy: [
                    { id: 1, title: "Flood Fill", leetcode: "https://leetcode.com/problems/flood-fill/" },
                    { id: 2, title: "Number of Islands", leetcode: "https://leetcode.com/problems/number-of-islands/" },
                    { id: 3, title: "Find the Town Judge", leetcode: "https://leetcode.com/problems/find-the-town-judge/" },
                    { id: 4, title: "Find Center of Star Graph", leetcode: "https://leetcode.com/problems/find-center-of-star-graph/" },
                    { id: 5, title: "Find if Path Exists in Graph", leetcode: "https://leetcode.com/problems/find-if-path-exists-in-graph/" }
                ],
                medium: [
                    { id: 1, title: "Course Schedule", leetcode: "https://leetcode.com/problems/course-schedule/" },
                    { id: 2, title: "Pacific Atlantic Water Flow", leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
                    { id: 3, title: "Surrounded Regions", leetcode: "https://leetcode.com/problems/surrounded-regions/" },
                    { id: 4, title: "Rotting Oranges", leetcode: "https://leetcode.com/problems/rotting-oranges/" },
                    { id: 5, title: "Clone Graph", leetcode: "https://leetcode.com/problems/clone-graph/" }
                ],
                hard: [
                    { id: 1, title: "Word Ladder", leetcode: "https://leetcode.com/problems/word-ladder/" },
                    { id: 2, title: "Alien Dictionary", leetcode: "https://leetcode.com/problems/alien-dictionary/" },
                    { id: 3, title: "Bus Routes", leetcode: "https://leetcode.com/problems/bus-routes/" },
                    { id: 4, title: "Reconstruct Itinerary", leetcode: "https://leetcode.com/problems/reconstruct-itinerary/" },
                    { id: 5, title: "Critical Connections in a Network", leetcode: "https://leetcode.com/problems/critical-connections-in-a-network/" }
                ]
            }
        },
        {
            id: 7,
            title: "Heap/Priority Queue",
            questions: {
                easy: [
                    { id: 1, title: "Kth Largest Element in a Stream", leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
                    { id: 2, title: "Last Stone Weight", leetcode: "https://leetcode.com/problems/last-stone-weight/" },
                    { id: 3, title: "Relative Ranks", leetcode: "https://leetcode.com/problems/relative-ranks/" },
                    { id: 4, title: "Maximum Product of Three Numbers", leetcode: "https://leetcode.com/problems/maximum-product-of-three-numbers/" },
                    { id: 5, title: "Sort Array by Increasing Frequency", leetcode: "https://leetcode.com/problems/sort-array-by-increasing-frequency/" }
                ],
                medium: [
                    { id: 1, title: "Kth Largest Element in an Array", leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
                    { id: 2, title: "Top K Frequent Elements", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/" },
                    { id: 3, title: "Find K Pairs with Smallest Sums", leetcode: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/" },
                    { id: 4, title: "Task Scheduler", leetcode: "https://leetcode.com/problems/task-scheduler/" },
                    { id: 5, title: "K Closest Points to Origin", leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/" }
                ],
                hard: [
                    { id: 1, title: "Find Median from Data Stream", leetcode: "https://leetcode.com/problems/find-median-from-data-stream/" },
                    { id: 2, title: "Merge k Sorted Lists", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
                    { id: 3, title: "Sliding Window Maximum", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
                    { id: 4, title: "Trapping Rain Water II", leetcode: "https://leetcode.com/problems/trapping-rain-water-ii/" },
                    { id: 5, title: "IPO", leetcode: "https://leetcode.com/problems/ipo/" }
                ]
            }
        },
        {
            id: 8,
            title: "Backtracking",
            questions: {
                easy: [
                    { id: 1, title: "Letter Case Permutation", leetcode: "https://leetcode.com/problems/letter-case-permutation/" },
                    { id: 2, title: "Binary Watch", leetcode: "https://leetcode.com/problems/binary-watch/" },
                    { id: 3, title: "Find Mode in Binary Search Tree", leetcode: "https://leetcode.com/problems/find-mode-in-binary-search-tree/" },
                    { id: 4, title: "Increasing Subsequences", leetcode: "https://leetcode.com/problems/increasing-subsequences/" },
                    { id: 5, title: "Iterator for Combination", leetcode: "https://leetcode.com/problems/iterator-for-combination/" }
                ],
                medium: [
                    { id: 1, title: "Permutations", leetcode: "https://leetcode.com/problems/permutations/" },
                    { id: 2, title: "Subsets", leetcode: "https://leetcode.com/problems/subsets/" },
                    { id: 3, title: "Combination Sum", leetcode: "https://leetcode.com/problems/combination-sum/" },
                    { id: 4, title: "Word Search", leetcode: "https://leetcode.com/problems/word-search/" },
                    { id: 5, title: "Generate Parentheses", leetcode: "https://leetcode.com/problems/generate-parentheses/" }
                ],
                hard: [
                    { id: 1, title: "N-Queens", leetcode: "https://leetcode.com/problems/n-queens/" },
                    { id: 2, title: "Sudoku Solver", leetcode: "https://leetcode.com/problems/sudoku-solver/" },
                    { id: 3, title: "Word Search II", leetcode: "https://leetcode.com/problems/word-search-ii/" },
                    { id: 4, title: "Remove Invalid Parentheses", leetcode: "https://leetcode.com/problems/remove-invalid-parentheses/" },
                    { id: 5, title: "Palindrome Partitioning", leetcode: "https://leetcode.com/problems/palindrome-partitioning/" }
                ]
            }
        }
    ];

    const toggleTopic = (topicId) => {
        setExpandedTopic(expandedTopic === topicId ? null : topicId);
    };

    const toggleDifficulty = (topicId, difficulty) => {
        setExpandedDifficulty(prev => ({
            ...prev,
            [topicId]: prev[topicId] === difficulty ? null : difficulty
        }));
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#00b894';
            case 'medium': return '#fdcb6e';
            case 'hard': return '#d63031';
            default: return '#333';
        }
    };

    return (
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 20px'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: '2.5rem',
                        color: '#333',
                        marginBottom: '30px',
                        textAlign: 'center'
                    }}
                >
                    DSA Practice Sheets
                </motion.h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {dsaQuestions.map(topic => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div
                                onClick={() => toggleTopic(topic.id)}
                                style={{
                                    padding: '20px',
                                    backgroundColor: '#f8f9fa',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
                                    {topic.title}
                                </h2>
                                <span style={{ fontSize: '1.5rem' }}>
                                    {expandedTopic === topic.id ? '▼' : '▶'}
                                </span>
                            </div>

                            {expandedTopic === topic.id && (
                                <div style={{ padding: '20px' }}>
                                    {['easy', 'medium', 'hard'].map(difficulty => (
                                        <div key={difficulty} style={{ marginBottom: '15px' }}>
                                            <div
                                                onClick={() => toggleDifficulty(topic.id, difficulty)}
                                                style={{
                                                    padding: '10px',
                                                    backgroundColor: getDifficultyColor(difficulty),
                                                    color: 'white',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '10px'
                                                }}
                                            >
                                                <span style={{ textTransform: 'capitalize' }}>{difficulty}</span>
                                                <span>{expandedDifficulty[topic.id] === difficulty ? '▼' : '▶'}</span>
                                            </div>

                                            {expandedDifficulty[topic.id] === difficulty && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    style={{ marginLeft: '20px' }}
                                                >
                                                    {topic.questions[difficulty].map(question => (
                                                        <motion.a
                                                            key={question.id}
                                                            href={question.leetcode}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            whileHover={{ scale: 1.02 }}
                                                            style={{
                                                                display: 'block',
                                                                padding: '10px',
                                                                marginBottom: '5px',
                                                                backgroundColor: 'white',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '5px',
                                                                textDecoration: 'none',
                                                                color: '#333',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            {question.title}
                                                        </motion.a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
    );
};

export default DSASheets;