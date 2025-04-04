module.exports = (temp, student) => {
    let output = temp.replace(/{%NAME%}/g, student.name);
    output = output.replace(/{%COURSE%}/g, student.course);
    output = output.replace(/{%YEAR%}/g, student.year);
    output = output.replace(/{%EMAIL%}/g, student.email);
    output = output.replace(/{%ID%}/g, student.id);
    return output;
  };
  