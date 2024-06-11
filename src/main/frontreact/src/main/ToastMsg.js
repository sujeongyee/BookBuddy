import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastMsg = ({ prop }) => {
  const [prevProp, setPrevProp] = useState(null);

  useEffect(() => {
    if (prop) {
      toast.remove();
      if (prop === 'success') {
        toast.success('추천 게시글 작성 완료');
      } else if (prop === 'success2') {
        toast.success('리뷰 게시글 작성 완료');
      } else if (prop === 'loginSuccess') {
        toast.success('로그인 성공! 환영합니다');
      } else if (prop === 'addFollowSuccess') {
        toast.success('팔로우 완료!');
      } else if (prop === 'cancelFollowSuccess') {
        toast.success('언팔로우 완료!');
      } else if (prop === 'myPostLike') {
        toast.error('내 게시글은 추천할 수 없습니다.');
      } else if (prop === 'doComment'){
        toast.success('댓글 작성 완료!');
      }
    }
  }, [prop, prevProp]);

  return <Toaster />;
};

export default ToastMsg;
