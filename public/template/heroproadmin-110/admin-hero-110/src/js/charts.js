$(() => {
  if (document.getElementById('posts-chart')) {
    new Morris.Line({
      element: 'posts-chart',
      data: [
      { month: '2017-06', a: 215 , b: 116, c: 34},
      { month: '2017-07', a: 104 , b: 91, c: 23},
      { month: '2017-08', a: 68 , b: 43, c: 18},
      { month: '2017-09', a: 58 , b: 23, c: 9},
      { month: '2017-10', a: 44 , b: 37, c: 12}
      ],
      xkey: 'month',
      ykeys: ['a', 'b', 'c'],
      labels: ['Views', 'Likes', 'Comments'],
      lineColors: [colors.color_primary, colors.color_success, colors.color_warning],
      resize: true
    });
  }

  new Chart($('#radar-chart'), {
    type: 'radar',
    data: {
      labels:
      [
      "01", "02", "03", "04",
      "05", "06", "07", "08",
      "09", "10", "11", "12"
      ],
      datasets: [
      {
        label: 'Sales',
        data: [100, 150, 300, 215, 183, 400, 287, 301, 501, 489, 423, 105],
        borderWidth: 1,
        borderColor: colors.color_primary,
        backgroundColor: colors.color_bg,
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          display: false
        }
      },
    }
  });

  new Chart($('#radar-chart2'), {
    type: 'radar',
    data: {
      labels:
      [
      "01", "02", "03", "04",
      "05", "06", "07", "08",
      "09", "10", "11", "12"
      ],
      datasets: [
      {
        label: 'Users',
        data: [155, 500, 525, 78, 60, 100],
        borderWidth: 1,
        borderColor: colors.color_danger,
        backgroundColor: 'rgba(255, 112, 118, .62)',
      },
      {
        label: 'Sales',
        data: [283, 300, 600, 315, 283, 100, 187, 101, 155, 189, 325, 101],
        borderWidth: 1,
        borderColor: colors.color_warning,
        backgroundColor: 'rgba(245, 182, 102, .62)',
      }
      ]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          display: false
        }
      },
    }
  });

  new Chart($("#mixed-chart")[0].getContext('2d'), {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Sales',
        data: [75, 80, 53, 55],
        bordedColor: colors.color_primary,
        backgroundColor: 'rgba(103, 116, 223,.62)'
      }, {
        label: 'Target',
        data: [60, 60, 60, 60],
        type: 'line',
        bordedColor: colors.color_warning,
        backgroundColor: 'rgba(245, 182, 102, .62)'
      }],
      labels: ['January', 'February', 'March', 'April']
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          display: false
        }
      },
    }
  });

  // Morris Charts
  new Morris.Line({
    element: 'morris-line-chart',
    data: [
    { year: '2013', a: 17 , b: 21, c: 8},
    { year: '2014', a: 10 , b: 12, c: 10},
    { year: '2015', a: 5 , b: 32, c: 19},
    { year: '2016', a: 17 , b: 23, c: 20},
    { year: '2017', a: 29 , b: 37, c: 21}
    ],
    xkey: 'year',
    ykeys: ['a', 'b', 'c'],
    labels: ['iPhone', 'Android', 'Other'],
    lineColors: [colors.color_primary, colors.color_success, colors.color_warning],
    resize: true
  });

  new Morris.Area({
    element: 'morris-area-chart',
    data: [
    { year: '2013', a: 20 , b: 34, c: 12},
    { year: '2014', a: 10 , b: 34, c: 12},
    { year: '2015', a: 5 , b: 34, c: 12},
    { year: '2016', a: 5 , b: 34, c: 12},
    { year: '2017', a: 20 , b: 34, c: 12}
    ],
    xkey: 'year',
    ykeys: ['a', 'b', 'c'],
    labels: ['iPhone', 'Android', 'Other'],
    lineColors: [colors.color_primary, colors.color_success, colors.color_warning],
    resize: true
  });

  new Morris.Bar({
    element: 'morris-bar-chart',
    data: [
    { year: '2013', a: 7 , b: 11, c: 5},
    { year: '2014', a: 14 , b: 34, c: 9},
    { year: '2015', a: 51 , b: 62, c: 18},
    { year: '2016', a: 85 , b: 70, c: 34},
    { year: '2017', a: 112 , b: 104, c: 59}
    ],
    xkey: 'year',
    ykeys: ['a', 'b', 'c'],
    labels: ['iPhone', 'Android', 'Other'],
    barColors: [colors.color_primary, colors.color_success, colors.color_warning],
    resize: true
  });

  new Morris.Donut({
    element: 'morris-donut-chart',
    data: [
    { label: 'All tests', value: 20 },
    { label: 'Passed', value: 10 },
    { label: 'Warnings', value: 5 },
    { label: 'Failed', value: 5 },
    { label: 'Builds', value: 64 }
    ],
    resize: true,
    colors: [colors.color_primary, colors.color_success, colors.color_warning, colors.color_danger, colors.color_blue]
  });

  new Morris.Donut({
    element: 'morris-donut-chart2',
    data: [
    { label: 'Sales', value: 20 },
    { label: 'Orders', value: 5 },
    { label: 'Requests', value: 10 }
    ],
    resize: true,
    colors: [colors.color_primary, colors.color_primary, colors.color_bg]
  });
});