const PROMISE_STATUS = {
  PENDING: "pending",
  SUCCESS: "fulfilled",
  FAIL: "rejected",
};

const promiseStoreMap = new Map();
window.promiseMap = promiseStoreMap;

const createCustomPromise = (asyncFunction) => {
  const customPromise = {
    status: null,
    result: null,
    error: null,
    cache: null,
  };

  const suspender = async () => {
    // 기존 suspender 부분
    try {
      customPromise.status = PROMISE_STATUS.PENDING;
      customPromise.result = await asyncFunction();
      customPromise.status = PROMISE_STATUS.SUCCESS;
    } catch (err) {
      customPromise.status = PROMISE_STATUS.FAIL;
      customPromise.error = err;
    }
  };

  customPromise.run = suspender;
  return customPromise;
};

function useSuspendedQuery(key, asyncFunction) {
  const parsedKey = JSON.stringify(key);
  if (!promiseStoreMap.has(parsedKey)) {
    promiseStoreMap.set(parsedKey, createCustomPromise(asyncFunction));
  }

  const customPromise = promiseStoreMap.get(parsedKey);

  if (customPromise.status === null) {
    // 같은 queryKey 값으로 불렸을 경우, 같은 promise를 바라볼 수 있도록 cache에 실행한 suspender(.run())를 담아준다.
    customPromise.cache = customPromise.run();
    throw customPromise.run(); // suspender
  } else if (customPromise.status === PROMISE_STATUS.FAIL) {
    throw customPromise.error;
  }

  if (customPromise.status === PROMISE_STATUS.PENDING) {
    // status의 초기 상태는 null이고 이후에 pending으로 바뀐 뒤, fulfilled 혹은 rejected가 된다.
    // pending일 경우 suspense에 갖히게 될 텐데, 여기서 감지될 경우는 suspense의 동작이 잘못된 것
    if (customPromise.cache) {
      // 캐시된 값이 있을 경우 해당 suspender를 다시 던지고 이외의 경우에는 에러로 판단
      throw customPromise.cache;
      // throw customPromise.run();
    }
    throw new Error("Suspens Error");
  }

  return { data: customPromise.result };
}

export default useSuspendedQuery;
