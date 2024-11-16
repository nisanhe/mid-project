import { useState, useEffect } from 'react';

function App() {
  // States
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hoveredUserId, setHoveredUserId] = useState(null); // Track the hovered user for "Other Data"
  const [selectedUserId, setSelectedUserId] = useState(null); // Track the selected user
  const [isAddingTodo, setIsAddingTodo] = useState(false); // Toggle for add todo form
  const [isAddingPost, setIsAddingPost] = useState(false); // Toggle for add post form
  const [newTodoTitle, setNewTodoTitle] = useState(''); // New todo title
  const [newPostTitle, setNewPostTitle] = useState(''); // New post title
  const [newPostBody, setNewPostBody] = useState(''); // New post body
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todosData = await todosResponse.json();
        setTodos(todosData);

        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter users based on search (Case 2)
  const filteredUsers = users.filter(user => {
    const searchLower = searchText.toLowerCase();
    return user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower);
  });

  // Check if user has uncompleted todos (Case 1)
  const hasUncompletedTodos = (userId) => {
    return todos.some(todo =>
      todo.userId === userId && !todo.completed
    );
  };

  // CRUD Operations
  const handleUpdate = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    // Remove user from the users list
    setUsers(users.filter(user => user.id !== userId));

    // Remove todos and posts of the user
    setTodos(todos.filter(todo => todo.userId !== userId));
    setPosts(posts.filter(post => post.userId !== userId));

    setSelectedUserId(null); // Deselect user if deleted
  };

  // Mark todo as completed
  // Mark todo as completed or not completed
  const markTodoCompleted = (todoId, completed) => {
    setTodos(todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: completed } : todo
    ));
  };


  const handleUserChange = (userId, field, value) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, [field]: value } : user
    ));
  };
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      email: newUserEmail,
      address: {}
    };

    setUsers([...users, newUser]);
    setNewUserName('');
    setNewUserEmail('');
  };
  // Add new todo
  const handleAddTodo = () => {
    const newTodo = {
      userId: selectedUserId,
      id: todos.length + 1, // Generate a new ID for the todo
      title: newTodoTitle,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setIsAddingTodo(false); // Hide add form
    setNewTodoTitle(''); // Reset new todo title
  };

  // Add new post
  const handleAddPost = () => {
    const newPost = {
      userId: selectedUserId,
      id: posts.length + 1, // Generate a new ID for the post
      title: newPostTitle,
      body: newPostBody,
    };
    setPosts([...posts, newPost]);
    setIsAddingPost(false); // Hide add form
    setNewPostTitle(''); // Reset new post title
    setNewPostBody(''); // Reset new post body
  };

  // Styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      gap: '20px'
    },
    userSection: {
      width: '30%'
    },
    detailsSection: {
      width: '100%',
      display: 'flex',
      gap: '20px'
    },
    todoSection: {
      width: '70%',
    },
    postSection: {
      width: '60%',
    },
    searchContainer: {
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    input: {
      padding: '3px',
      borderRadius: '3px',
      border: '1px solid #ccc'
    },
    button: {
      backgroundColor: '#ffd700',
      border: '1px solid #ccc',
      borderRadius: '3px',
      padding: '5px 10px',
      margin: '5px',
      cursor: 'pointer'
    },
    userCard: (userId) => ({
      border: '2px solid',
      borderColor: hasUncompletedTodos(userId) ? 'red' : 'green',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      backgroundColor: selectedUserId === userId ? 'orange' : 'white' // Highlight selected user
    }),
    otherDataContainer: {
      position: 'relative',
      cursor: 'pointer'
    },
    otherData: {
      backgroundColor: '#f0f0f0',
      padding: '5px 10px',
      borderRadius: '3px',
      display: 'inline-block',
      margin: '5px 0'
    },
    additionalData: {
      position: 'absolute',
      top: '100%',
      left: '0',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 1000,
      minWidth: '200px',
      border: '1px solid #ccc'
    },
    inputGroup: {
      margin: '5px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }
  };

  return (
    <div style={styles.container}>
      {/* User Section */}
      <div style={styles.userSection}>
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <label>Search:</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button}>Add</button>
        </div>

        {/* Users List */}
        {filteredUsers.map(user => (
          <div key={user.id} style={styles.userCard(user.id)}>
            <div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedUserId(user.id === selectedUserId ? null : user.id)}
              >
                ID: {user.id}
              </div>
            </div>
            <div style={{ margin: '5px 0' }}>
              <label>Name:</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleUserChange(user.id, 'name', e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={{ margin: '5px 0' }}>
              <label>Email:</label>
              <input
                type="text"
                value={user.email}
                onChange={(e) => handleUserChange(user.id, 'email', e.target.value)}
                style={styles.input}
              />
            </div>
            {/* Other Data Section */}
            <div
              style={styles.otherDataContainer}
              onMouseEnter={() => setHoveredUserId(user.id)}
              onMouseLeave={() => setHoveredUserId(null)}
            >
              <div style={styles.otherData}>Other Data</div>
              {hoveredUserId === user.id && (
                <div style={styles.additionalData}>
                  <div>Street: {user.address?.street}</div>
                  <div>City: {user.address?.city}</div>
                  <div>Zip Code: {user.address?.zipcode}</div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleUpdate(user)}
              style={styles.button}
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              style={styles.button}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Todo and Post Details Section */}
      <div style={styles.detailsSection}>
        {selectedUserId && (
          <>
            {/* Todos Section */}
            <div style={styles.todoSection}>
              <h3>ToDos - User {selectedUserId}</h3>
              {isAddingTodo ? (
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="New Todo Title"
                    style={styles.input}
                  />
                  <button
                    onClick={handleAddTodo}
                    style={{ ...styles.button, marginLeft: '5px' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAddingTodo(false)}
                    style={{ ...styles.button, marginLeft: '5px' }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsAddingTodo(true)}
                    style={styles.button}
                  >
                    Add
                  </button>
                  <div>
                    {todos
                      .filter(todo => todo.userId === selectedUserId)
                      .map(todo => (
                        <div key={todo.id}>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => markTodoCompleted(todo.id, !todo.completed)} // הפוך את מצב ה-completed
                          />
                          {todo.title}
                          {!todo.completed && (
                            <button
                              onClick={() => markTodoCompleted(todo.id, true)} // מסמן את המשימה כהושלמה
                              style={{ marginLeft: '5px' }}
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>

                      ))}
                  </div>
                </>
              )}
            </div>
            {/* Posts Section */}
            <div style={styles.postSection}>
              <h3>Posts - User {selectedUserId}</h3>
              {isAddingPost ? (
                <div>
                  <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Post Title"
                    style={{ ...styles.input }}
                  />
                  <textarea
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                    placeholder="Post Body"
                    style={{ ...styles.input, width: '100%', height: '100px' }}
                  />
                  <button
                    onClick={handleAddPost}
                    style={{ ...styles.button, marginRight: '5px' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAddingPost(false)}
                    style={styles.button}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsAddingPost(true)}
                    style={styles.button}
                  >
                    Add
                  </button>
                  <div>
                    {posts
                      .filter(post => post.userId === selectedUserId)
                      .map(post => (
                        <div key={post.id} style={{ marginBottom: '10px' }}>
                          <h4>{post.title}</h4>
                          <p>{post.body}</p>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
