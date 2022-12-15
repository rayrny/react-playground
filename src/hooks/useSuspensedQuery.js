import _isEqual from "lodash/isEqual";

const PROMISE_STATUS = {
  PENDING: "pending",
  SUCCESS: "fulfilled",
  FAIL: "rejected",
};

const promiseStoreMap = new Map();

const hasKey = (key) => {
  let isExist = false;
  promiseStoreMap.forEach((value, _key) => {
    if (_isEqual(_key, key)) {
      isExist = true;
    }
  });
  return isExist;
};

const getByKey = (key) => {
  let mapValue = null;
  promiseStoreMap.forEach((value, _key) => {
    if (_isEqual(_key, key)) {
      mapValue = value;
    }
  });
  return mapValue;
};

const createCustomPromise = (asyncFunction) => {
  const customPromise = {
    status: null,
    result: null,
    error: null,
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
  if (!hasKey(key)) {
    promiseStoreMap.set(key, createCustomPromise(asyncFunction));
  }

  const customPromise = getByKey(key);
  if (customPromise.status === null) {
    throw customPromise.run(); // suspender
  } else if (customPromise.status === PROMISE_STATUS.FAIL) {
    throw customPromise.error;
  }

  if (customPromise.stauts === PROMISE_STATUS.PENDING) {
    // status의 초기 상태는 null이고 이후에 pending으로 바뀐 뒤, fulfilled 혹은 rejected가 된다.
    // pending일 경우 suspense에 갖히게 될 텐데, 여기서 감지될 경우는 suspense의 동작이 잘못된 것
    throw new Error("Suspens Error");
  }

  return { data: customPromise.result };
}

export default useSuspendedQuery;
