exports.checkSensorAlerts = functions.database.ref('/sensor_data/{pushId}')
.onCreate((snapshot, context) => {
  const { s1, s2, s3, s4 } = snapshot.val();
  const alerts = [];

  if (s1 < 6.5 || s1 > 8.5) alerts.push(`pH out of range: ${s1}`);
  if (s2 < 20 || s2 > 35) alerts.push(`Temp out of range: ${s2}`);
  if (s3 > 80) alerts.push(`Turbidity high: ${s3}`);
  if (s4 > 500) alerts.push(`TDS high: ${s4}`);

  if (alerts.length) {
    // Push notification or write to /notifications
    return admin.database().ref('/notifications').push({
      ts: Date.now(),
      message: alerts.join(', ')
    });
  }
  return null;
});
