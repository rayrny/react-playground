// suspense와 함께 사용하기 위해, 자식 컴포넌트에서 비동기적으로 데이터 패치 시 이 유틸 사용
const store = {};

window.storeTest = store; // 확인용 코드
const createPromiseResource = (key, promise) => {
  if (!store[key]) {
    store[key] = {
      status: "pending",
      result: null,
    };
  }

  let suspender = promise()
    .then((res) => {
      store[key].status = "fullfilled";
      store[key].result = res;
    })
    .catch((err) => {
      store[key].status = "rejected";
      store[key].result = err;
    });

  return {
    read() {
      switch (store[key].status) {
        case "pending":
          throw suspender;
        case "rejected":
          throw store[key].result;
        default:
          return store[key].result;
      }
    },
  };
};

export default createPromiseResource;
