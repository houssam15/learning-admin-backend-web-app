<h1>Driving License API</h1>
  <p>
    This repository contains the Driving License API, which provides functionality for authentication, quiz management, user role updates, and media handling. This documentation explains the available endpoints, request/response formats, and usage examples.
  </p>

  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#authentication-endpoints">Authentication Endpoints</a></li>
    <li><a href="#quiz-management-endpoints">Quiz Management Endpoints</a></li>
    <li><a href="#user-management-endpoints">User Management Endpoints</a></li>
    <li><a href="#media-management-endpoints">Media Management Endpoints</a></li>
  </ul>

  <h2 id="getting-started">Getting Started</h2>
  <h3>Base URL</h3>
  <pre><code>http://localhost:3000</code></pre>
  <h3>Authentication</h3>
  <p>
    Some endpoints require authentication using a Bearer token. Include the token in the <code>Authorization</code> header:
  </p>
  <pre><code>Authorization: Bearer &lt;your_token&gt;</code></pre>

  <h2 id="authentication-endpoints">Authentication Endpoints</h2>
  <h3>1. Login</h3>
  <p><strong>Endpoint:</strong> <code>POST /auth/login</code></p>
  <h4>Request Body:</h4>
  <pre><code>{
  "email": "test2@test.com",
  "password": "test"
}</code></pre>

  <h3>2. Register</h3>
  <p><strong>Endpoint:</strong> <code>POST /auth/register</code></p>
  <h4>Request Body:</h4>
  <pre><code>{
  "email": "test2@test.com",
  "password": "test",
  "name": "admin"
}</code></pre>

  <h2 id="quiz-management-endpoints">Quiz Management Endpoints</h2>
  <h3>1. Create Quiz</h3>
  <p><strong>Endpoint:</strong> <code>POST /quiz</code></p>
  <h4>Request Body:</h4>
  <pre><code>{
  "title": "Quiz Title",
  "description": "Quiz Description"
}</code></pre>

  <h3>2. Add Question to Quiz</h3>
  <p><strong>Endpoint:</strong> <code>POST /quiz/{quizId}/questions</code></p>
  <h4>Request Body:</h4>
  <pre><code>{
  "questionText": "What is the capital of France?",
  "isMultiple": false,
  "responses": [
    { "text": "Paris", "isCorrect": true },
    { "text": "Lyon", "isCorrect": false }
  ]
}</code></pre>

  <h3>3. Get All Quizzes</h3>
  <p><strong>Endpoint:</strong> <code>GET /quiz</code></p>

  <h3>4. Get Quiz Questions</h3>
  <p><strong>Endpoint:</strong> <code>GET /quiz/{quizId}</code></p>

  <h3>5. Delete Quiz</h3>
  <p><strong>Endpoint:</strong> <code>DELETE /quiz/{quizId}</code></p>

  <h2 id="user-management-endpoints">User Management Endpoints</h2>
  <h3>1. Update User Role</h3>
  <p><strong>Endpoint:</strong> <code>PUT /user/{userId}/update_role</code></p>
  <h4>Request Body:</h4>
  <pre><code>{
  "role": "admin"
}</code></pre>

  <h2 id="media-management-endpoints">Media Management Endpoints</h2>
  <h3>1. Upload File</h3>
  <p><strong>Endpoint:</strong> <code>POST /media/upload</code></p>
  <h4>Request Body:</h4>
  <ul>
    <li><code>file</code>: File to upload</li>
    <li><code>keyword</code>: Associated keywords for the file</li>
  </ul>

  <h3>2. Delete File</h3>
  <p><strong>Endpoint:</strong> <code>DELETE /media/{fileId}</code></p>

  <h3>3. Get Media by ID</h3>
  <p><strong>Endpoint:</strong> <code>GET /media/{fileId}</code></p>

  <h3>4. Download Media by ID</h3>
  <p><strong>Endpoint:</strong> <code>GET /media/download/{fileId}</code></p>

  <h2>Notes</h2>
  <ul>
    <li>Replace <code>{quizId}</code>, <code>{userId}</code>, and <code>{fileId}</code> with actual IDs.</li>
    <li>Ensure all required fields are included in the request body.</li>
    <li>The API responses depend on successful authentication and correct data.</li>
  </ul>

  <p>For more details, import the provided <a href="https://interstellar-desert-580452.postman.co/workspace/Team-Workspace~1083c245-52cb-485d-8ce4-e50b29d996ff/collection/25640574-4108ccf7-d688-4061-9992-81d5f455afdb?action=share&source=collection_link&creator=25640574">Postman collection</a> into Postman to test endpoints directly.</p>

