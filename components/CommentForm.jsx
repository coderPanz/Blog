"use client"
import { useState, useEffect } from "react";
import { submitComment } from "@/server";
const CommentForm = ({ slug }) => {
  const [ error, setError ] = useState(false);
  const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
  // 记录输入框的状态
  const [ inputObj, setInputObj ] = useState({
    comment: ' ',
    name: ' ',
    email: ' ',
    isRemember: false
  })

  // 组件挂载时从localStorage中获取缓存数据
  useEffect(() => {
    const rememberObj = {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email')
    }
    setInputObj(rememberObj)
  }, [])

  const onInputChange = (e) => {
    const { target } = e
    // 检查是否需要记住用户信息
    if(target.type === 'checkbox') {
      // 先对isRemember取反
      setInputObj((prevState) => ({
        ...prevState,
        isRemember: !prevState.isRemember
      }))
    } else {
      // 保存输入框的内容到inputObj中
      // [target.name]可以灵活的更新不同的输入框
      setInputObj((prevState) => ({
        ...prevState,
        [target.name]: target.value
      }))
    }
  }

  // 提交事件
  const handlePostSubmission = () => {
    // 先设置提交若发生错误则弹出提示为false
    setError(false)
    // 结构formData中的数据
    const { name, email, isRemember, comment } = inputObj
    // 检查是否输入完全
    if(!name || !email || !comment) {
      setError(true)
      // 3秒后提示消失
      setTimeout(() => {
        setError(false)
      }, 3000);
      return
    }
    // 若复选框选中, 则缓存数据到localStorage中
    if (isRemember) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    // es6语法初始化提交对象
    const commentObj = { name, email, comment, slug }

    // 提交
    submitComment(commentObj)
      .then(res => {
        // 返回提交成功的信息
        if (res.createComment) {
          // 如果没有选中复选框则提交或将个人信息清除
          if (!isRemember) {
            inputObj.name = '';
            inputObj.email = '';
          }
          // 提示清除
          inputObj.comment = '';
          // 更新输入框信息
          setInputObj((prevState) => ({
            ...prevState,
            ...inputObj,
          }));
          // 显示提示信息
          setShowSuccessMessage(true);
          // 3秒后提示消失
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 2500);
        }
      });

  }

  return (
    // 评论表单
    <div className=" bg-gray-50 p-6 rounded-xl">
      {/* 标题 */}
      <div className="font-semibold text-2xl italic">知无不言</div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-8 gap-6">
        {/* 评论内容 */}
        <textarea name="comment" value={inputObj.comment ?? ''} onChange={onInputChange} placeholder="言无不尽" id="comment" className=" bg-gray-200 col-span-1 lg:col-span-8 rounded-xl p-3 h-16"></textarea>
        {/* 用户名 */}
        <input name="name" value={inputObj.name ?? ''} onChange={onInputChange} placeholder="username" className=" bg-gray-200 col-span-1 lg:col-span-4 p-2 h-10 rounded-md" type="text" />
        {/* 邮箱 */}
        <input name="email" value={inputObj.email ?? ''} onChange={onInputChange} placeholder="email" className=" bg-gray-200 col-span-1 lg:col-span-4 p-2 h-10 rounded-md" type="text" />
      </div>
      {/* 记住邮箱和用户 */}
      <div className="flex items-center mt-3">
        <input name='isRemember' value={inputObj.isRemember ?? ''} type="checkbox" onChange={onInputChange}/>
        <label className="text-sm ml-2">记住用户信息</label>
      </div>
      {/* 出错提示 */}
      {error && <p className="text-sm text-red-500 absolute">缺失必填字段!</p>}
      {/* 提交按钮 */}
      <div className="text-center mt-5">
        <button onClick={handlePostSubmission} className="text-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-md text-white">
          提交
        </button>
        {showSuccessMessage && <button className="text-base rounded-md w-28 h-10 text-white absolute bg-green-500 ml-72">已提交待审查</button>}
      </div>
      {/* 成功提示 */}

    </div>
  );
};
export default CommentForm;
