import React, { useState } from "react";
import "./App.css";

function App() {
  // Состояние для хранения постов
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editPost, setEditPost] = useState("");

  // Добавить новый пост
  const handleAddPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost(""); // очистить поле ввода
    }
  };

  // Редактировать пост
  const handleEditPost = (index) => {
    setEditIndex(index);
    setEditPost(posts[index]);
  };

  // Сохранить отредактированный пост
  const handleSaveEdit = () => {
    const updatedPosts = [...posts];
    updatedPosts[editIndex] = editPost;
    setPosts(updatedPosts);
    setEditIndex(null); // выход из режима редактирования
    setEditPost(""); // очистить поле редактирования
  };

  // Удалить пост
  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  return (
    <div className="App">
      <h1>Блог</h1>

      {/* Форма для нового поста */}
      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Напишите новый пост..."
      />
      <button onClick={handleAddPost}>Добавить пост</button>

      {/* Отображение постов */}
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editPost}
                  onChange={(e) => setEditPost(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Сохранить</button>
              </div>
            ) : (
              <div>
                <p>{post}</p>
                <button onClick={() => handleEditPost(index)}>Редактировать</button>
                <button onClick={() => handleDeletePost(index)}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
