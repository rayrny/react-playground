// suspense와 함께 사용하기 위해, 자식 컴포넌트에서 비동기적으로 데이터 패치 시 이 유틸 사용
const createPromiseResource = (promise) => {
  let status = "pending";
  let result = null;

  let suspender = promise.then(
    (res) => {
      status = "fullfilled";
      result = res;
      console.log(status, result);
    },
    (err) => {
      status = "rejected";
      result = err;
    }
  );

  console.log(status, result);
  return {
    read() {
      console.log(status);

      switch (status) {
        case "pending":
          throw { suspender, status };
        // throw suspender;
        case "rejected":
          throw result;
        default:
          return result;
      }
    },
  };
};

export default createPromiseResource;
