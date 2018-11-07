function TimeoutError(message, timeout) {
  const name = 'DataQueryTimeout';

  Error.captureStackTrace(this, TimeoutError);

  this.name = name;
  this.message = message || 'The query Timed out'
  this.code = 'DataQueryTimeout';
}

TimeoutError.prototype = Object.create(Error.prototype);

function isRedshiftCancelledError(err) {
  return (err && err.code === '57014' || err.message === "Query cancelled on user's request")
}

/**
 * Verify the query error and return the appropiate error instance
 * @param {Error} err - The caught error
 * @param {number} timeout A timeout in case if caught error if from Timeout
 */
function verifyQueryError(err, timeout) {
  if (isRedshiftCancelledError(err) && timeout) { //the error was cancelled due to statement timeout
    const message = `Max connection Query ${(timeout||'default')+' ms'} Timeout Reached`;
    return new TimeoutError(message, timeout);
  }
  return err;
}


module.exports = {TimeoutError, isRedshiftCancelledError, verifyQueryError};