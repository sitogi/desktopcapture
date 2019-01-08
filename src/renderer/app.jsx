import React from "react";
import { render } from "react-dom";
import "./app.css";
import Trimmer from "./Trimmer";

// render() は第一引数の内容を第二引数のところに描画するって意味かも
render(<Trimmer />, document.getElementById("app"));

