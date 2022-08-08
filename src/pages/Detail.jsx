import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getDetail, __editDetail } from "../redux/modules/todosSlice";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { todo, isLoading, error } = useSelector((state) => state.todos);
  const [count, Setcount] = useState(true);
  const navigation = useNavigate();
  const [write, Setwrite] = useState(false);

  const [detailTodo, SetdetailTodo] = useState({
    id: "",
    name: "",
    title: "",
    body: "",
    isDone: false,
  });
  const detail = { id, detailTodo };
  useEffect(() => {
    dispatch(__getDetail(id));
  }, []);
  const oneditChangeHandler = () => {
    Setcount((prev) => !prev); //true->false
    Setwrite((prev) => !prev); //faluse->true
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    SetdetailTodo({ ...detailTodo, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (count === false) {
      return;
    } else {
      dispatch(__editDetail(detail));
      // window.location.reload();
    }
  };

  return (
    <div>
      <nav className="nav">
        <h3>
          <button
            onClick={() => {
              navigation("/");
            }}
          >
            Home
          </button>
          Details
        </h3>
      </nav>
      <hr />
      <h4 className="prev_page">
        <button
          onClick={() => {
            navigation("/list");
          }}
        >
          이전으로
        </button>
      </h4>

      <div className="container">
        <form onSubmit={onSubmitHandler}>
          <section className="user_name">
            {write === false ? (
              <h2 className="editWrite">{todo.name}</h2>
            ) : (
              <input
                type="text"
                onChange={onChangeHandler}
                name="name"
                style={{ marginBottom: "30px" }}
              ></input>
            )}
          </section>
          <section className="subject">
            {write === false ? (
              <h2 className="editWrite">{todo.title}</h2>
            ) : (
              <input
                type="text"
                onChange={onChangeHandler}
                name="title"
                style={{ marginBottom: "30px" }}
              ></input>
            )}
          </section>
          <section className="content">
            {write === false ? (
              <h2 className="editWrite">{todo.body}</h2>
            ) : (
              <input
                type="text"
                onChange={onChangeHandler}
                name="body"
                style={{ marginBottom: "30px" }}
              ></input>
            )}
          </section>
          <div className="edit_button">
            <button
              onClick={oneditChangeHandler}
              style={{
                color: "tomato",
                width: "25%",
              }}
            >
              {write === false ? "수정하기" : "수정등록!!"}
            </button>
          </div>
        </form>
      </div>
      <hr style={{ marginTop: "5%" }} />
      <Comment></Comment>
    </div>
  );
};
export default Detail;
