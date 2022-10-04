package com.expense.expensemanagement.config;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.expense.expensemanagement.service.cognito.CognitoService;
import com.expense.expensemanagement.service.cognito.CognitoServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class CognitoConfiguration {

	private Logger logger = LoggerFactory.getLogger(CognitoConfiguration.class);

	private static final String COGNITO_IDENTITY_POOL_URL = "https://cognito-idp.%s.amazonaws.com/%s";
	private static final String JSON_WEB_TOKEN_SET_URL_SUFFIX = "/.well-known/jwks.json";

	@Value("${aws.cognito.userPoolId}")
	private String userPoolId;

	@Value("${aws.cognito.identityPoolId}")
	private String identityPoolId;

	@Value("${aws.cognito.region}")
	private String region;

	@Value("${aws.cognito.userNameField}")
	private String userNameField;

	@Value("${aws.cognito.groupsField}")
	private String groupsField;

	@Value("${aws.cognito.connectionTimeout}")
	private int connectionTimeout;

	@Value("${aws.cognito.readTimeout}")
	private int readTimeout;

	@Value("${aws.cognito.clientId}")
	private String clientId;

	private String httpHeader = "Authorization";
	private String jwkUrl;

	@Value("${aws.cognito.accessKey}")
	private String accessKey;

	@Value("${aws.cognito.secretKey}")
	private String secretKey;

	@Value("${aws.cognito.authFlow}")
	private String authFlow;

	@Bean("CognitoIdentityProvider")
	public AWSCognitoIdentityProvider cognitoIdentityProvider() throws Exception {
		logger.debug("Configuring Cognito");
//		AWSCredentials cred = new Defa
//		AWSCredentialsProvider credProvider = new AWSStaticCredentialsProvider(cred);
//
		AWSCognitoIdentityProvider cognitoIdentityProvider = AWSCognitoIdentityProviderClientBuilder.defaultClient();
		logger.debug("Cognito initialized successfully");
		return cognitoIdentityProvider;
	}

	@Bean
	public CognitoService cognitoService() {
		return new CognitoServiceImpl();
	}

	public String getJwkUrl() {
		if (jwkUrl == null || jwkUrl.isEmpty()) {
			return String.format(COGNITO_IDENTITY_POOL_URL + JSON_WEB_TOKEN_SET_URL_SUFFIX, region, userPoolId);
		}
		return jwkUrl;
	}

	public String getCognitoIdentityPoolUrl() {
		return String.format(COGNITO_IDENTITY_POOL_URL, region, userPoolId);
	}

	public void setJwkUrl(String jwkUrl) {
		this.jwkUrl = jwkUrl;
	}

	public String getUserPoolId() {
		return userPoolId;
	}

	public void setUserPoolId(String userPoolId) {
		this.userPoolId = userPoolId;
	}

	public String getIdentityPoolId() {
		return identityPoolId;
	}

	public CognitoConfiguration setIdentityPoolId(String identityPoolId) {
		this.identityPoolId = identityPoolId;
		return this;
	}

	public String getHttpHeader() {
		return httpHeader;
	}

	public void setHttpHeader(String httpHeader) {
		this.httpHeader = httpHeader;
	}

	public String getUserNameField() {
		return userNameField;
	}

	public void setUserNameField(String userNameField) {
		this.userNameField = userNameField;
	}

	public String getGroupsField() {
		return groupsField;
	}

	public void setGroupsField(String groupsField) {
		this.groupsField = groupsField;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public int getConnectionTimeout() {
		return connectionTimeout;
	}

	public void setConnectionTimeout(int connectionTimeout) {
		this.connectionTimeout = connectionTimeout;
	}

	public int getReadTimeout() {
		return readTimeout;
	}

	public void setReadTimeout(int readTimeout) {
		this.readTimeout = readTimeout;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getAuthFlow() {
		return authFlow;
	}

	public void setAuthFlow(String authFlow) {
		this.authFlow = authFlow;
	}

	public String getAccessKey() {
		return accessKey;
	}

	public void setAccessKey(String accessKey) {
		this.accessKey = accessKey;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}
}
