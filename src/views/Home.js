import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import i18n, { languageList, fallbackLng } from '../i18n' // to handle hl parameter
import { withTranslation, Trans } from 'react-i18next'
import qs from 'qs'

import { Link } from 'react-router-dom'
import {
  Jumbotron,
  Button,
  Row,
  Col,
} from 'reactstrap'

import { logIn, authUserWithToken } from 'store/actions/userActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCompactDisc,
  faLock,
  faPencilAlt,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import {
  faLastfm,
  faDiscord,
  faPatreon,
} from '@fortawesome/free-brands-svg-icons'

const bodyDecoration = 'with-shadow'

class Home extends Component {
  constructor(props) {
    super(props)
    if (this.props.location.search) {
      if (!this.props.user.isLoggedIn) {
        let token = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token || null
        if (token) {
          let history = this.props.history
          this.props.authUserWithToken(token, () => {
            history.push('/scrobble/song')
          })
          history.push('/') // Clear the URL
        }
      }

      if (this.props.lang === 'auto') {
        let suggestedLang = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).hl || null
        if (suggestedLang) {
          let langFound

          for (let lang of languageList) {
            if (suggestedLang === lang.code) {
              langFound = true
              break
            }
          }

          if (langFound || Object.prototype.hasOwnProperty.call(fallbackLng, suggestedLang)) {
            i18n.changeLanguage(suggestedLang)
          }
        }
      }
    }
  }

  componentDidMount() {
    document.body.classList.add(bodyDecoration)
  }

  componentWillUnmount() {
    document.body.classList.remove(bodyDecoration)
  }

  render() {
    const t = this.props.t
    const isLoggedIn = this.props.user.isLoggedIn

    let homeContent

    if (isLoggedIn) {
      homeContent = (
        <div className="HomeButtons flex-row d-block d-md-flex">
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <Button tag={Link} to="/scrobble/song" size="lg" color="secondary" block className="py-3 px-2">
              <FontAwesomeIcon icon={faPencilAlt} size="3x" className="d-block mb-3 mx-auto" />
              {t('scrobbleManually')}
            </Button>
          </div>
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <Button tag={Link} to="/scrobble/album" size="lg" color="secondary" block className="py-3 px-2">
              <FontAwesomeIcon icon={faCompactDisc} size="3x" className="d-block mb-3 mx-auto" />
              {t('scrobbleFromAlbum')}
            </Button>
          </div>
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <Button tag={Link} to="/scrobble/user" size="lg" color="secondary" block className="py-3 px-2">
              <FontAwesomeIcon icon={faUserFriends} size="3x" className="d-block mb-3 mx-auto" />
              {t('scrobbleFromOtherUser')}
            </Button>
          </div>
        </div>
      )
    } else {
      homeContent = (
        <div>
            <p className="text-center">{t('authNeeded')}</p>
            <p className="lead text-center">
              <Button onClick={this.props.logIn} size="lg" color="danger">
                <FontAwesomeIcon icon={faLastfm} color="white" /> {t('logInWithLastFm')}
              </Button>
              <br />
              <small className="text-muted text-copy">
                <FontAwesomeIcon icon={faLock} /> {t('logInIsSafe')}
              </small>
            </p>
        </div>
      )
    }

    return (
      <div>
        <Row>
          <Col lg={ isLoggedIn ? 12 : 7 }>
            <Jumbotron>
              <h1 className="display-5">
                <Trans i18nKey="welcomeToTheScrobbler">
                  Welcome to the <span className="ows-title">Open Scrobbler</span>!
                </Trans>
              </h1>
              <p className="lead">
                {t('purpose')}
              </p>
              <br />
              {homeContent}
            </Jumbotron>
          </Col>
          <Col lg="5" className={ isLoggedIn ? 'd-none' : '' }>
            <Jumbotron className="alternative-content discord">
              <Row>
                <Col>
                  <h4>
                    <Trans i18nKey="about.title">What is this?</Trans>
                  </h4>
                  <p>
                    <Trans i18nKey="about.description">
                      An open source scrobbler for the web, which allows you to manually input songs and add them to your Last.fm profile.
                    </Trans>
                  </p>
                  <img src="/img/screenshot-180915-sm.webp" alt="Application screenshot" className="img-fluid d-none d-lg-block img-thumbnail mx-auto mb-2" />
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
            <Col sm="6">
              <Jumbotron className="alternative-content discord">
                <Row>
                  <Col xs="3" sm="3" className="logo">
                    <FontAwesomeIcon icon={faDiscord} size="4x" className="d-block mx-auto" />
                  </Col>
                  <Col xs="9" sm="9">
                    <h4>{t('discord.title')}</h4>
                    <p>{t('discord.copy')}</p>
                    <Button outline type="secondary" size="sm" href="https://discord.gg/SEDp6Zy" className="float-right col-12 col-lg-6">
                      {t('discord.CTA')}
                    </Button>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
            <Col sm="6">
              <Jumbotron className="alternative-content patreon">
                <Row>
                  <Col xs="3" sm="3" className="logo">
                    <FontAwesomeIcon icon={faPatreon} size="4x" className="d-block mx-auto" />
                  </Col>
                  <Col xs="9" sm="9">
                    <h4>{t('support.title')}</h4>
                    <p>{t('support.copy')}</p>
                    <Button outline type="secondary" size="sm" href="https://www.patreon.com/OpenScrobbler" className="float-right col-12 col-lg-6">
                      {t('support.CTA')}
                    </Button>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lang: state.settings.lang,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: logIn(dispatch),
    authUserWithToken: authUserWithToken(dispatch),
  }
}

Home.propTypes = {
  authUserWithToken: PropTypes.func,
  history: PropTypes.object,
  lang: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  logIn: PropTypes.func,
  t: PropTypes.func,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(Home)
)
