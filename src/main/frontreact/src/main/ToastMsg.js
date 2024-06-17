import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastMsg = ({ prop }) => {
  const [prevProp, setPrevProp] = useState(null);

  useEffect(() => {
    if (prop !== prevProp) {
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
      } else if (prop === 'modifyRcm'){
        toast.success('추천글 수정 완료!')
      } else if (prop === 'modifyRv'){
        toast.success('리뷰글 수정 완료!')
      }
      setPrevProp(prop); // 현재 prop을 prevProp으로 설정
    }
  }, [prop, prevProp]);

  return <Toaster />;
};

export default ToastMsg;
