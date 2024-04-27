import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function ToastMsg({prop}) {
  useEffect(() => {
    if(prop==='success'){
      toast.success('추천 게시글 작성 완료');
    }else if (prop==='success2'){
      toast.success('리뷰 게시글 작성 완료')
    }
  }, []);

  return (
    <Toaster/>
  );
}

export default ToastMsg;