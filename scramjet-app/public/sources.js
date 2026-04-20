const availableSources = [
    {
        id: 'vidsrccc',
        name: 'VidSrcCC',
        isFrench: false,
        urls: {
            movie: 'https://vidsrc.cc/v2/embed/movie/{id}?autoPlay=false',
            tv: 'https://vidsrc.cc/v2/embed/tv/{id}/{season}/{episode}?autoPlay=false'
        }
    },
    {
        id: 'vidsrcXyz',
        name: 'VidSrcXyz',
        isFrench: false,
        urls: {
            movie: 'https://vidsrc.xyz/embed/movie/{id}',
            tv: 'https://vidsrc.xyz/embed/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'vidsrcrip',
        name: 'VidSrcRIP',
        isFrench: false,
        urls: {
            movie: 'https://vidsrc.rip/embed/movie/{id}',
            tv: 'https://vidsrc.rip/embed/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'vidsrcsu',
        name: 'VidSrcSU',
        isFrench: false,
        urls: {
            movie: 'https://vidsrc.su/embed/movie/{id}',
            tv: 'https://vidsrc.su/embed/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'vidsrcvip',
        name: 'VidSrcVIP',
        isFrench: false,
        urls: {
            movie: 'https://vidsrc.vip/embed/movie/{id}',
            tv: 'https://vidsrc.vip/embed/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'vidsrccx',
        name: 'VidSrcCX',
        isFrench: false,
        urls: {
            movie: 'https://vidsrc.cx/embed/movie/{id}',
            tv: 'https://vidsrc.cx/embed/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'embedsu',
        name: 'EmbedSU',
        isFrench: false,
        urls: {
            movie: 'https://embed.su/embed/movie/{id}',
            tv: 'https://embed.su/embed/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'multiembed',
        name: 'MultiEmbed',
        isFrench: false,
        urls: {
            movie: 'https://multiembed.mov/?video_id={id}&tmdb=1',
            tv: 'https://multiembed.mov/?video_id={id}&tmdb=1&s={season}&e={episode}'
        }
    },
    {
        id: 'vidlink',
        name: 'VidLink',
        isFrench: false,
        urls: {
            movie: 'https://vidlink.pro/movie/{id}',
            tv: 'https://vidlink.pro/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'hexa',
        name: 'Hexa',
        isFrench: false,
        urls: {
            movie: 'https://hexa.watch/watch/movie/{id}',
            tv: 'https://hexa.watch/watch/tv/{id}/{season}/{episode}'
        }
    },
    {
        id: 'pstream',
        name: 'P-Stream',
        isFrench: false,
        urls: {
            movie: 'https://iframe.pstream.mov/media/tmdb-movie-{id}',
            tv: 'https://iframe.pstream.mov/media/tmdb-tv-{id}/{season}/{episode}'
        }
    },
    {
        id: 'frembed',
        name: 'Frembed',
        isFrench: true,
        urls: {
            movie: 'https://frembed.icu/api/film.php?id={id}',
            tv: 'https://frembed.icu/api/serie.php?id={id}&sa={season}&epi={episode}'
        }
    }
];
