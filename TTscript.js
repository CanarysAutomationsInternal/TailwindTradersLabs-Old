$(document).ready(function () {
    // $('.explore').click(function () {
    //     ga('send', 'event', (this).data('text'), 'visited');
    // });
    // $('.try').click(function () {
    //     ga('send', 'event', (this).data('text'), 'clicked');
    // });

    $('#btnGithubDownload').click(function () {  
        console.log("GitHub download");     
        // window.open("https://github.com/Microsoft/TailwindTraders-Website",'_blank');
        ga('send', 'event', 'GitHub download', 'Clicked');
    });
    $('#btnGithubDemo').click(function () {
        console.log("GitHub demo"); 
        ga('send', 'event', 'GitHub demo', 'Clicked');
    });
    $('#btnAKSDownload').click(function () {
        ga('send', 'event', 'AKS download', 'Clicked');
    });
    $('#btnAKSDemo').click(function () {
        ga('send', 'event', 'AKS demo', 'Clicked');
    });
    $('#btnDotNetDownload').click(function () {
        ga('send', 'event', 'DotNet download', 'Clicked');
    });
    $('#btnDotNetDemo').click(function () {
        ga('send', 'event', 'DotNet demo', 'Clicked');
    });
    $('#btnVSDownload').click(function () {
        ga('send', 'event', 'Visual Studio 2019 download', 'Clicked');
    });
    $('#btnVSDemo').click(function () {
        ga('send', 'event', 'Visual Studio 2019 demo', 'Clicked');
    });
    $('#btnAppCenterDownload').click(function () {
        ga('send', 'event', 'App Center download', 'Clicked');
    });  
    $('#btnAppCenterDemo').click(function () {
        ga('send', 'event', 'App Center demo', 'Clicked');
    });
});