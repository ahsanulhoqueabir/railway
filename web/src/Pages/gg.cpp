#include<bits/stdc++.h>
using namespace std;

int mul(vector<int>& dim) {
    int n = dim.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));

    for (int l = 2; l <= n; ++l) {
        for (int i = 0; i <= n - l; ++i) {
            int j = i + l - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; ++k) {
                int cost = dp[i][k] + dp[k + 1][j] + dim[i] * dim[k + 1] * dim[j + 1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }

    return dp[0][n - 1];
}

int main() {
    vector<int> dim = {3,4,5,6,7,8}; 
    cout << "Minimum number of multiplications: " << mul(dim) << endl;
    return 0;
}