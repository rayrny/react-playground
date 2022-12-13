// suspense와 함께 사용하기 위해, 자식 컴포넌트에서 비동기적으로 데이터 패치 시 이 유틸 사용
const createPromiseResource = (promise) => {
  let status = "pending";
  let result = null;

  const suspender = promise.then(
    (res) => {
      status = "fullfilled";
      result = res;
    },
    (err) => {
      status = "rejected";
      result = err;
    }
  );

  return {
    read() {
      switch (status) {
        case "pending":
          throw suspender;
        case "fullfilled":
          throw result;
        case "rejected":
          throw result;
        default:
          break;
      }
    },
  };
};

export default createPromiseResource;
